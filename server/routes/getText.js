const express = require('express');
const router = express.Router();
const tmp = require('tmp')
const request = require('request')
const extract = require('extract-zip')
const {Audio} = require("../models/Audio");
require('dotenv').config();
const formidable = require('formidable');
const {join} = require('path');
const path = require('path');
const axios = require("axios");
const csv = require('csv-parser')
const DOMAIN_NAME = process.env.ASR_SERVER_NODE
const spawn = require("child_process").spawn;
const TEMP_URL = 'server/public';
const bluebird = require('bluebird')
const uploadFile = require("../utils/uploadFile");

const fs = bluebird.promisifyAll(require('fs'));

let download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('finish', callback);
    });
}

function transcript(path, audio_link, audio_name) {
  return new Promise(function (resolve, reject) {
    let process = spawn('python', ["./sample_asr_python_grpc/main.py", path]);
    let transcript = ''
    process.stdout.on('data', function (data) {
      // console.log(data.toString())
      data = data.toString()
      transcript += data;
      const listAudio = {
        audio_link: audio_link,
        transcript: transcript,
        audio_name: audio_name
      }
      resolve(listAudio)

      // console.log(transcript)
    })
    process.stderr.on('data', function (data) {
      // console.log('stderr: ' + data);
      data = data.toString();
      transcript += data;
      reject(data)
    });
    // process.on('close', function (code) {
    //   // console.log('closing code: ' + code);
    //   resolve(code)
    //   // console.log('Full output of script: ', transcript);
    // });
  })
}
// function model_espnet(path) {
//   return new Promise(function (resolve, reject) {
//     let process = spawn('python3', ["./model_espnet/infer.py", path]);
//     process.stdout.on('data', function (data) {
//       resolve(data.toString())
//     })
//     // process.stderr.on('data', function (data) {
//     //   reject(data.toString())
//     // });
//
//   })
// }
// router.post('/', (req, res) => {
//   tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
//     if (err) throw err;
//
//     download(req.body.link, path, function () {
//       console.log('done');
//     });
//     model_espnet(path)
//         .then((data) => {
//           console.log(data)
//           res.json({status:1, transcript: data})
//         })
//         .catch(err => res.json({status:0, msg: err}));
//
//     cleanupCallback();
//   });
// })

async function checkCreateUploadFolder(uploadFolder) {
  try {
    await fs.statSync(uploadFolder)
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      try {
        await fs.mkdirSync(uploadFolder)

      } catch (e) {
        console.error('Error create the upload folder')
        return false
      }
    } else {
      console.error('Error create the upload folder')
      return false
    }
  }
  return true;
}

const deleteFolderRecursive = function (directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

async function downloadSyncFile(audioId, downloadURL,download_path) {
  return new Promise(async (fulfill, reject) => {

    const newPath = download_path + `${audioId}.wav`
    let stream = fs.createWriteStream(newPath);
    let response = await axios.get(downloadURL, {responseType: 'stream'});
    response.data.pipe(stream);
    stream.on('finish', fulfill);
    stream.on('error', reject); // presumably
  });
}

router.post('/getMulAudio', async (req, res) => {
  const listAudio = req.body.listAudio;
  console.log(listAudio)
  const root_path = path.resolve(TEMP_URL)
  console.log(root_path)
  await checkCreateUploadFolder(root_path)
  let download_path = path.join(root_path,"/download/")
  await checkCreateUploadFolder(download_path)
  let promise = []
  listAudio.map(ele => {
    promise.push(downloadSyncFile(ele._id, ele.audioLink,download_path))
  })

  Promise.all(promise)
      .then(async data => {
        const promises = []
        fs.readdirSync(download_path).forEach(file => {
          const filePath = download_path + file;
          promises.push(transcript(filePath, "audioLink", file.split('.')[0]))
        });
        Promise.all(promises)
            .then(data => {
              console.log(data[0].audio_name)
              data.map(ele => {
                Audio.updateOne({_id: ele.audio_name}, {$set: {bot_transcript: ele.transcript}}, function (err, res) {
                  if (err) throw err;
                  console.log("one element updated")
                })
              })
              res.json({ok: true, msg: 'Get transcript Successful', obj: data})
              deleteFolderRecursive(download_path)
            })
            .catch(err => console.log(err))
      })
})


function checkFileType(file) {
  const type = file.type.split("/").pop()
  const validTypes = ['wav', 'plain', 'zip']
  if (validTypes.indexOf(type) === -1) {
    console.log("File is invalid")
    return false;
  }
  return true;
}


router.post('/audioImport', async (req, res) => {
  const form = formidable.IncomingForm();
  const uploadFolder = './server/public/upload';
  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; //50MB
  form.uploadDir = uploadFolder;
  const folderExist = await checkCreateUploadFolder(uploadFolder)
  if (!folderExist) {
    return res.json({ok: false, msg: 'There was an error when create the folder upload'})
  }
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("error parsing the file")
      return res.json({ok: false, msg: 'error parsing the file'})
    }
    if (!files.files.length) {
      const file = files.files;
      const type = file.type.split("/").pop()
      console.log(type);
      const isValid = await checkFileType(file)
      const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
      // myUploadedFiles.push(fileName)
      let promises = []

      if (!isValid) {
        return res.json({ok: false, msg: 'The file receive is invalid'})
      }
      try {
        await fs.renameSync(file.path, join(uploadFolder, fileName));
        const filePath = join(uploadFolder, fileName)
        let path_components = filePath.split('/')
        // console.log(path_components)
        const audio_link = `${DOMAIN_NAME}/${path_components[1]}/${path_components[2]}/${path_components[3]}`
        // console.log(audio_link)
        let myUploadedFiles = []
        promises.push(transcript(filePath, audio_link, path_components[3]))

        Promise.all(promises)
            .then((data) => {
              res.json({ok: true, msg: 'Files uploaded successfully!', files: data})
            })
            .catch(err => console.log(err));

      } catch (e) {
        console.log('Error uploading the file')
        try {
          await fs.unlinkSync(file.path)
        } catch (e) {
        }
        return res.json({ok: false, msg: 'Error uploading the file'})
      }
    } else {
      let myUploadedFiles = []
      let promises = []
      for (let i = 0; i < files.files.length; i++) {
        const file = files.files[i]
        if (!checkFileType(file)) {
          console.log('The received file is not a valid type')
          return res.json({ok: false, msg: 'The sent file is not a valid type'})
        }
        const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
        try {
          await fs.renameSync(file.path, join(uploadFolder, fileName))
          const filePath = join(uploadFolder, fileName)
          let path_components = filePath.split('/')
          const fileType = filePath.split('.')

          if (fileType[1] === 'wav') {
            const audio_link = `${DOMAIN_NAME}/${path_components[1]}/${path_components[2]}/${path_components[3]}`
            const listAudio = {
              audio_link: audio_link,
              transcript: "",
              audio_name: path_components[3]
            }
            myUploadedFiles.push(listAudio)
            console.log(filePath)
            promises.push(transcript(filePath, audio_link, path_components[3]))
          }

        } catch (e) {
          console.log('Error uploading the file')
          try {
            await fs.unlinkSync(file.path)
          } catch (e) {
          }
          return res.json({ok: false, msg: 'Error uploading the file'})
        }
      }
      Promise.all(promises)
          .then((data) => {
            res.json({ok: true, msg: 'Files uploaded successfully!', files: data})
          })
          .catch(err => console.log(err));
      // res.json({ok: true, msg: 'Files uploaded successfully!', files: myUploadedFiles})
    }
    // res.json({ok: true, msg: 'Files uploaded successfully!', files: myUploadedFiles})
  })
})

function readFiles(dirname) {
  return new Promise(function (resolve, reject) {
    let fileList = []
    console.log(dirname)
    fs.readdirSync(dirname).forEach(file => {
      console.log(file);
      fileList.push(file)
    });
    resolve(fileList)
  })
}
function uploadMulAudio(audio) {
  return new Promise(async function (resolve, reject) {
    // console.log("audiolink:",audio.audio_link)
    // console.log("audiodestination:",audio.destination)
    // console.log("name",audio.name)
    // const audio_response = {
    //   id: audio.id,
    //   audio_link: audio.audio_link,
    //   transcript: audio.transcript,
    //   // audio_name: audio.audio_name,
    //   speaker_id: audio.speaker_id,
    //   speaker_accent: audio.speaker_accent,
    //   speaker_name: audio.speaker_name,
    //   speaker_gender: audio.speaker_gender,
    //   duration: audio.duration,
    //   room_id: audio.room_id,
    //   // content: audio.content,
    //   // style: audio.style,
    //   // type: audio.type,
    //   // device: audio.device,
    // }
    const audio_response = {
      user: audio.user_id,
      room: null,
      audioLink: audio.audio_link,
      transcript: audio.transcript,
      audioStyle: audio.audioStyle,
      recordDevice: "import",
      fixBy: null,
      username: audio.speaker_name,
      isValidate: false,
      origin_transcript: audio.transcript,
      bot_transcript: '',
      final_transcript: '',
      duration: audio.duration,
      wer: null,
      up_vote: [],
      down_vote: [],
      speaker_id: audio.speaker_id,
      room_name: audio.room_id
    }
    resolve(audio_response)
    // await uploadFile(audio.audio_link,audio.destination,audio.name)
    //     .then(res=>{
    //       // console.log("gbgubbhu",res.result.link)
    //       // console.log(audio)
    //       const audio_response = {
    //         id: audio.id,
    //         audio_link: res.result.link,
    //         transcript: audio.transcript,
    //         audio_name: audio.audio_name,
    //         speaker_id: audio.speaker_id,
    //         speaker_accent: audio.speaker_accent,
    //         speaker_name: audio.speaker_name,
    //         speaker_gender: audio.speaker_gender,
    //         duration: audio.duration,
    //         content: audio.content,
    //         style: audio.style,
    //         type: audio.type,
    //         device: audio.device,
    //       }
    //       resolve(audio_response)
    //
    //     })
    //     .catch(err=>{
    //       reject(err)
    //     })
  })
}
const saveAudioMongo = async (audioList) => {

  const audio = await Audio.create(audioList);

  return audio
}
router.post('/unzip',async (req,res)=>{
  const zip_link = req.body.zip_link
  const user_id = req.body.user;
  const audioStyle = req.body.audioStyle;

  const extractDir = './server/public/upload/extract';
  const createFolder = './server/public';
  await checkCreateUploadFolder(createFolder)
  const uploadFolder = './server/public/upload/';
  await checkCreateUploadFolder(uploadFolder)
  await checkCreateUploadFolder(extractDir)
  const fileName =zip_link.split("/").slice(-1).pop()
  const zip_name = fileName.split(".")[0].split("_")[0]
  // console.log("zipname",zip_name)
  try {
    const destDir = join(extractDir, fileName);
    // console.log("destination",destDir)
    await checkCreateUploadFolder(destDir)
    const extract_path = `${destDir}`
    await checkCreateUploadFolder(extract_path)
    // console.log("extract_path:",extract_path)
    const absolutePath = path.resolve(extract_path)
    tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
      if (err) throw err;

      download(zip_link, path, async function () {
        // console.log('done');
        // console.log('File: ', path);
        // console.log('File descriptor: ', fd);
        try {

          await extract(path, {dir: absolutePath})
              .then(async data => {
                    const newPath = join(absolutePath, zip_name)
                    await checkCreateUploadFolder(newPath)
                    readFiles(newPath)
                        .then(data => {
                          const transcript = join(newPath, data[0])
                          // console.log(transcript)
                          const results = [];

                          fs.createReadStream(transcript)
                              .pipe(csv({delimiter:','}))
                              .on('data', (data) => {
                                // console.log(data)
                                results.push(data)})
                              .on('end', () => {
                                const promise = [];
                                results.forEach((element, index) => {
                                  // const lastPath=extract_path.split("/")
                                  // const destination = `congpt/import/${lastPath[2]}/${lastPath[3]}/${lastPath[4].split('.')[0]}/${zip_name}/`
                                  // const audioLink = `${extract_path}/${zip_name}/${element.path}`
                                  // const name = element.path.split("/")[1].split(".")[0]


                                  const audio = {
                                    id: index,
                                    audio_link: element.audio_link,
                                    transcript: element.transcript,
                                    // audio_name: element.path,
                                    speaker_id: element.speaker_id,
                                    speaker_accent: element.speaker_accent,
                                    speaker_name: element.speaker_name,
                                    speaker_gender: element.speaker_gender,
                                    duration: element.duration,
                                    room_id: element.room_id,
                                    user_id: user_id,
                                    audioStyle: audioStyle
                                    // content: element.content,
                                    // style: element.style,
                                    // type: element.type,
                                    // device: element.device,
                                    // destination: destination,
                                    // name: name,
                                  }
                                  promise.push(uploadMulAudio(audio))
                                })

                                Promise.all(promise)
                                    .then(async data=>{
                                      await saveAudioMongo(data)
                                          .then(audioID => {
                                            // update audio history in room
                                            res.json({ok: true, msg: 'Files uploaded successfully!', files: audioID})
                                            console.log('Extraction complete')

                                          })
                                          .catch(err => {
                                            res.json({ok: false, msg: err})

                                          })
                                      deleteFolderRecursive(uploadFolder)

                                    })
                                    .catch(err=>{
                                      res.json({ok: false, msg: 'Files uploaded error!'})
                                      console.error('Extraction failed.',err);
                                    })

                              });
                        })
                  }
              )
        } catch (err) {
          res.json({ok: false, msg: 'Files uploaded error!'})
          console.error('Extraction failed.',err);
        }
      });
      cleanupCallback();
    });


  } catch (e) {
    console.log('Error uploading the file')
    try {
      await fs.unlinkSync(file.path)
    } catch (e) {
    }
    return res.json({ok: false, msg: 'Error uploading the file'})
  }
})
router.post('/audioImportZip', async (req, res) => {
  const form = formidable.IncomingForm();
  const createFolder = './server/public';
  await checkCreateUploadFolder(createFolder)
  const uploadFolder = './server/public/upload/';
  const extractDir = './server/public/upload/extract';
  form.multiples = true;
  form.maxFileSize = 100 * 1024 * 1024; //50MB
  form.keepExtensions = true;
  form.uploadDir = uploadFolder;
  const folderExist = await checkCreateUploadFolder(uploadFolder)
  if (!folderExist) {
    return res.json({ok: false, msg: 'There was an error when create the folder upload'})
  }
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("error parsing the file")
      return res.json({ok: false, msg: 'error parsing the file'})
    }
    if (!files.files.length) {
      const file = files.files;
      const type = file.type.split("/").pop()
      console.log(type);
      const isValid = await checkFileType(file)
      const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
      // const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
      // myUploadedFiles.push(fileName)
      let promises = []

      if (!isValid) {
        return res.json({ok: false, msg: 'The file receive is invalid'})
      }
      try {
        await fs.renameSync(file.path, join(uploadFolder, fileName));
        const filePath = join(uploadFolder, fileName)
        let path_components = filePath.split('/')
        const zip_link = `${DOMAIN_NAME}/${path_components[1]}/${path_components[2]}/${path_components[3]}`
        await checkCreateUploadFolder(extractDir)
        const destDir = path.join(extractDir, fileName);
        await checkCreateUploadFolder(destDir)
        const extract_path = `${destDir}_${new Date().getTime()}`
        await checkCreateUploadFolder(extract_path)
        console.log("extrac_path:",extract_path)
        const absolutePath = path.resolve(extract_path)
        console.log("ziplink:",zip_link)
        tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
          if (err) throw err;

          download(zip_link, path, async function () {
            console.log('done');
            console.log('File: ', path);
            console.log('File descriptor: ', fd);
            try {
              await extract(path, {dir: absolutePath})
                  .then(async data => {
                        const newPath = join(absolutePath, 'AudioFile')
                        await checkCreateUploadFolder(newPath)
                        readFiles(newPath)
                            .then(data => {
                              const transcript = join(newPath, data[0])
                              console.log(transcript)
                              const results = [];

                              fs.createReadStream(transcript)
                                  .pipe(csv())
                                  .on('data', (data) => results.push(data))
                                  .on('end', () => {
                                    const resArray = [];
                                    results.forEach((element, index) => {
                                      // const lastPath = join(newPath, element.path).split("/")
                                      const lastPath=extract_path.split("/")
                                      const audioLink = `${DOMAIN_NAME}/${lastPath[1]}/${lastPath[2]}/${lastPath[3]}/${lastPath[4]}/AudioFile/${element.path}`

                                      const listAudio = {
                                        id: index,
                                        audio_link: audioLink,
                                        transcript: element.transcript,
                                        audio_name: element.path,
                                        speaker_id: element.speaker_id,
                                        speaker_accent: element.speaker_accent,
                                        speaker_name: element.speaker_name,
                                        speaker_gender: element.speaker_gender,
                                        duration: element.duration,
                                        content: element.content,
                                        style: element.style,
                                        type: element.type,
                                        device: element.device,
                                      }
                                      resArray.push(listAudio)
                                    })

                                    res.json({ok: true, msg: 'Files uploaded successfully!', files: resArray})
                                    console.log('Extraction complete')

                                  });
                            })
                      }
                  )
            } catch (err) {

              res.json({ok: false, msg: 'Files uploaded error!'})
              console.error('Extraction failed.',err);
            }
          });
          cleanupCallback();
        });


      } catch (e) {
        console.log('Error uploading the file')
        try {
          await fs.unlinkSync(file.path)
        } catch (e) {
        }
        return res.json({ok: false, msg: 'Error uploading the file'})
      }
    } else {
      let myUploadedFiles = []
      let promises = []
      for (let i = 0; i < files.files.length; i++) {
        const file = files.files[i]
        if (!checkFileType(file)) {
          console.log('The received file is not a valid type')
          return res.json({ok: false, msg: 'The sent file is not a valid type'})
        }
        const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
        try {
          await fs.renameSync(file.path, join(uploadFolder, fileName))
          const filePath = join(uploadFolder, fileName)
          let path_components = filePath.split('/')
          const fileType = filePath.split('.')

          if (fileType[1] === 'wav') {
            const audio_link = `${DOMAIN_NAME}/${path_components[1]}/${path_components[2]}/${path_components[3]}`
            const listAudio = {
              audio_link: audio_link,
              transcript: "",
              audio_name: path_components[3]
            }
            myUploadedFiles.push(listAudio)
            console.log(filePath)
            promises.push(transcript(filePath, audio_link, path_components[3]))
          }

        } catch (e) {
          console.log('Error uploading the file')
          try {
            await fs.unlinkSync(file.path)
          } catch (e) {
          }
          return res.json({ok: false, msg: 'Error uploading the file'})
        }
      }
      Promise.all(promises)
          .then((data) => {
            res.json({ok: true, msg: 'Files uploaded successfully!', files: data})
          })
          .catch(err => console.log(err));
      // res.json({ok: true, msg: 'Files uploaded successfully!', files: myUploadedFiles})
    }
    // res.json({ok: true, msg: 'Files uploaded successfully!', files: myUploadedFiles})
  })
})


router.get("/getAll", (req, res) => {
  Audio.find()
      .exec((err, audios) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(audios)
      })
});
module.exports = router;