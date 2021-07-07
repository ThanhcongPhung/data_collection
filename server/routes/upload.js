const express = require('express');
const router = express.Router();
const {Audio} = require("./../models/Audio");
const {Chatroom} = require("./../models/Chatroom");
const formidable = require('formidable');
const {join} = require('path');
const {
  ASR_SERVER_NODE,
  ASR_URL,
  ASR_AUTH_KEY,
} = require('../configs');
const bluebird = require('bluebird')
const axios = require("axios");
const fs = bluebird.promisifyAll(require('fs'));
const spawn = require("child_process").spawn;

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

function transcript(path, audio_link, audio_name) {
  return new Promise(function (resolve, reject) {
    let process = spawn('python', ["./sample_asr_python_grpc/main.py", path]);
    let transcript = ''
    process.stdout.on('data', function (data) {
      data = data.toString()
      transcript += data;
      const listAudio = {
        audio_link: audio_link,
        transcript: transcript,
        audio_name: audio_name
      }
      resolve(listAudio)

    })
    process.stderr.on('data', function (data) {
      data = data.toString();
      transcript += data;
      reject(data)
    });

  })
}

router.post('/file', async (req, res) => {
  const form = formidable.IncomingForm();
  const uploadFolder = './server/public/record';
  // the err ^^^^^^ there doesn't seem to be err but rather something else... But either way it works for now, the thing up there doesn't matter that much.
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
    const file = files.file;
    const user = fields.userID;
    const room = fields.roomID;
    const username = fields.username;
    const duration = fields.duration;
    // console.log(file)
    const newPath = join(uploadFolder, room)
    await checkCreateUploadFolder(newPath)
    const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
    try {
      await fs.renameSync(file.path, join(newPath, fileName));
      const filePath = join(newPath, fileName)
      console.log(filePath)
      let path_components = filePath.split('/')
      const audio_link = `${ASR_SERVER_NODE}/${path_components[1]}/${path_components[2]}/${path_components[3]}/${path_components[4]}`
      console.log(audio_link)
      transcript(filePath, audio_link, path_components[3])
          .then((data) => {
            saveAudioMongo(user, room, username, data.audio_link, data.transcript, "Conversation", 1,
                null, false, "", data.transcript, "",
                duration, null, false, [], fileName)
                .then(audioID => {
                  // update audio history in room
                  err = updateRoomInfo(room, audioID);
                  if (err) {
                    res.status(500).send(err)
                    throw err
                  }

                  res.status(200).send({link: audio_link, transcript: data.transcript, audioID: audioID, isLike: false})
                })
          })
          .catch(err => {
            console.log(err)
          })
    } catch (e) {
      console.log('Error uploading the file')
      try {
        await fs.unlinkSync(file.path)
      } catch (e) {
      }
      return res.json({ok: false, msg: 'Error uploading the file'})
    }

  })
})

function transcriptGoogle(audio_link) {
  return new Promise(function (resolve, reject) {
    try {
      axios({
        method: 'GET',
        url: `https://dev-asr.iristech.club/v1/transcript?url=${audio_link}`,
        // url: `${ASR_URL}/api/v1/stt?url=${audio_link}`,
        // headers: {
        //   'Authorization': "Bearer " + `${ASR_AUTH_KEY}`,
        // },
      }).then(res => {
        if (res.data.status === 1) {
          console.log(res.data)
          resolve(res.data.result.transcription)
        } else {
          reject(res.data.message)
        }

      })
    } catch (e) {
      console.log(e)
    }

  })
}

router.post('/transcript', async (req, res) => {
  const audio_link = req.body.audio_link;
  await transcriptGoogle(audio_link)
      .then(async (data) => {
        res.status(200).send({transcript: data})
      })
      .catch(err => {
        res.status(401).send({transcript: err})
      })
})
router.post('/fileV2', async (req, res) => {
  const user = req.body.userID;
  const room = req.body.roomID;
  const username = req.body.username;
  const audio_link = req.body.audio_link;
  const duration = req.body.duration;
  const fileName = req.body.audio_link.split("/")[-1]
  const speaker_id = req.body.speaker_id;
  await transcriptGoogle(req.body.audio_link)
      .then(async (data) => {
        await saveAudioMongo(user, room, username, audio_link, data, "Conversation", 1,
            null, false, "", data, "",
            duration, null, false, [], fileName,speaker_id)
            .then(audioID => {
              // update audio history in room
              let err = updateRoomInfo(room, audioID);
              if (err) {
                res.status(500).send(err)
                throw err
              }
              res.status(200).send({link: audio_link, transcript: data, audioID: audioID, isLike: false})
            })
            .catch(err => {
              console.log(err)
            })
      })
})
router.post('/fileV3', async (req, res) => {
  const user = req.body.userID;
  const room = req.body.roomID;
  const username = req.body.username;
  const audio_link = req.body.audio_link;
  const duration = req.body.duration;
  const fileName = req.body.audio_link.split("/")[-1]
  const speaker_id = req.body.speaker_id;
  const transcript = req.body.transcript;
  const bot_transcript = req.body.bot_transcript
  await saveAudioMongo(user, room, username, audio_link, transcript, "Conversation", "record",
      null, false, "", bot_transcript, "",
      duration, null, false, [], fileName, speaker_id)
      .then(audioID => {
        // update audio history in room
        let err = updateRoomInfo(room, audioID);
        if (err) {
          res.status(500).send(err)
          throw err
        }
        res.status(200).send({link: audio_link, transcript: transcript, audioID: audioID, isLike: false})
      })
      .catch(err => {
        console.log(err)
      })
})
const saveAudioMongo = async (userID, chatroomID, username, audioLink, transcript, audioStyle,
                              recordDevice, fixBy, isValidate, origin_transcript, bot_transcript,
                              final_transcript, duration, wer, isLike, upvote, audio_name, speaker_id) => {

  const audio = await Audio.create({
    user: userID,
    room: chatroomID,
    username: username,
    audioLink: audioLink,
    transcript: transcript,
    audioStyle: audioStyle,
    recordDevice: recordDevice,
    fixBy: fixBy,
    isValidate: isValidate,
    origin_transcript: origin_transcript,
    bot_transcript: bot_transcript,
    final_transcript: final_transcript,
    duration: duration,
    wer: wer,
    isLike: isLike,
    upvote: upvote,
    audio_name: audio_name,
    speaker_id: speaker_id
  })

  return audio._id
}

const updateRoomInfo = (roomID, audioID) => {

  Chatroom.findById(roomID)
      .then(roomFound => {
        if (!roomFound) {
          return "Room not found!"
        } else {
          roomFound.audioList.push(audioID);
          return roomFound.save();
        }
      })
      .then(roomUpdated => {
        // console.log(`Room ${roomUpdated.name} updated audio information successfully!`)
        return null
      })
      .catch(err => {
        console.log("Unable to update audio information to room")
        console.log(err)
        return err
      });
}
router.post('/saveAudio', (req, res, err) => {


  const userID = req.body.userID;
  const roomID = req.body.roomID;
  const audioLink = req.body.audioLink;
  const transcript = req.body.transcript;
  try {
    // save the audio information
    saveAudioMongo(userID, roomID, audioLink, transcript)
        .then(audioID => {
          // update audio history in room
          err = updateRoomInfo(roomID, audioID);
          if (err) throw err
        })
    return res.status(200).send({success: true, link: audioLink, transcript: transcript})
  } catch (error) {
    console.log("Dead")
    res.status(500).send({success: false, error})
  }
})
module.exports = router;
