const express = require('express');
const router = express.Router();
const uploadService = require('../services/upload')
const multer = require('multer')
const {Audio} = require("./../models/Audio");
const {Chatroom} = require("./../models/Chatroom");
const {User} = require("./../models/User")
const formidable = require('formidable');
const {join} = require('path');
const DOMAIN_NAME = "http://localhost:5000"
const bluebird = require('bluebird')
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
    // console.log(file)
    const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
    try {
      await fs.renameSync(file.path, join(uploadFolder, fileName));
      const filePath = join(uploadFolder, fileName)
      let path_components = filePath.split('/')
      console.log(path_components)
      const audio_link = `${DOMAIN_NAME}/${path_components[1]}/${path_components[2]}/${path_components[3]}`
      console.log(filePath)

      transcript(filePath, audio_link, path_components[3])
          .then((data) => {
            saveAudioMongo(user, room, username, data.audio_link, data.transcript, "Conversation", 1, null, false)
                .then(audioID => {
                  // update audio history in room
                  err = updateRoomInfo(room, audioID);
                  if (err) {
                    res.status(500).send(err)
                    throw err
                  }

                  res.status(200).send({link: audio_link, transcript: data.transcript})
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


  // try {
  //   console.log(req.file)
  //   let path_components = req.file.path.split('/')
  //   console.log(path_components)
  //   let audio_link = `${DOMAIN_NAME}/${path_components[1]}/${path_components[2]}`
  //   let text = "text";
  //   // save the audio information
  //   saveAudioMongo(userID, roomID, audio_link, text)
  //       .then(audioID => {
  //         // update audio history in room
  //         err = updateRoomInfo(roomID, audioID);
  //         if (err) throw err
  //       })
  //   return res.status(200).send({success: true, link: audio_link, transcript: text})
  // } catch (error) {
  //   console.log("Dead")
  //   res.status(500).send({success: false, error})
  // }
})


const saveAudioMongo = async (userID, chatroomID, username, audioLink, transcript, audioStyle, recordDevice, fixBy, isValidate) => {

  const audio = await Audio.create({
    user: userID,
    room: chatroomID,
    username: username,
    audioLink: audioLink,
    transcript: transcript,
    audioStyle: audioStyle,
    recordDevice: recordDevice,
    fixBy: fixBy,
    isValidate: isValidate

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
