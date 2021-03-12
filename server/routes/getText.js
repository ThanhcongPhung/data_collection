const express = require('express');
const router = express.Router();
const tmp = require('tmp')
const request = require('request')
const extract = require('extract-zip')
const uploadService = require('../services/upload');
const multer = require('multer')
const formidable = require('formidable');
const {join} = require('path');

const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'));

// var storage = multer.diskStorage({
//   destination: function (re  q, file, cb) {
//     cb(null, './public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

router.post('/',(req,res)=>{
  console.log(req.body.link)
  const spawn = require("child_process").spawn;

  tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
    if (err) throw err;

    download(req.body.link, path , function(){
      console.log('done');
    });
    console.log('File: ', path);
    console.log('File descriptor: ', fd);

    let process = spawn('python',["./sample_asr_python_grpc/main.py",path] );

    process.stdout.on('data', function(data) {
      res.send(data.toString());
    } )

    cleanupCallback();
  });
})

// var upload = multer({ storage: storage })
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

function checkFileType(file) {
  console.log(file.type)
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
  // console.log(__dirname)
  const uploadFolder = './public/upload';
  const extractDir = './public/upload/extract';

  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; //50MB
  form.uploadDir = uploadFolder;
  const folderExist = await checkCreateUploadFolder(uploadFolder)
  if (!folderExist) {
    return res.json({ok: false, msg: 'There was an error when create the folder upload'})
  }
  // console.log(form)
  form.parse(req, async (err, fields, files) => {
    let myUploadedFiles = []
    if (err) {
      console.log("error parsing the file")
      return res.json({ok: false, msg: 'error parsing the file'})
    }
    // console.log(files)
    if (!files.files.length) {
      const file = files.files;
      // console.log(file.type)
      const type = file.type.split("/").pop()
      console.log(type);
      const isValid = await checkFileType(file)
      console.log(file.name)
      const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
      console.log(fileName)
      myUploadedFiles.push(fileName)

      if (!isValid) {
        return res.json({ok: false, msg: 'The file receive is invalid'})
      }
      try {
        await fs.renameSync(file.path, join(uploadFolder, fileName));
      } catch (e) {
        console.log('Error uploading the file')
        try {await fs.unlinkSync(file.path)} catch (e) {}
        return res.json({ok: false, msg: 'Error uploading the file'})
      }

    } else {
      for (let i = 0; i < files.files.length; i++) {
        const file = files.files[i]
        if (!checkFileType(file)) {
          console.log('The received file is not a valid type')
          return res.json({ok: false, msg: 'The sent file is not a valid type'})
        }
        const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
        myUploadedFiles.push(fileName)
        try {
          await fs.renameSync(file.path, join(uploadFolder, fileName))
        } catch (e) {
          console.log('Error uploading the file')
          try {
            await fs.unlinkSync(file.path)
          } catch (e) {
          }
          return res.json({ok: false, msg: 'Error uploading the file'})
        }
      }
    }
    res.json({ok: true, msg: 'Files uploaded successfully!', files: myUploadedFiles})
  })
})


module.exports = router;