const express = require('express');
const router = express.Router();
const uploadService = require('../services/upload')
const multer = require('multer')
const {Audio} = require("./../models/Audio");
const {Chatroom} = require("./../models/Chatroom");
const {User} = require("./../models/User")
const DOMAIN_NAME = "http://localhost:5000"
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})
var upload = multer({ storage: storage }).single('soundBlob')

router.post('/file', upload, (req, res, err) => {

  // the err ^^^^^^ there doesn't seem to be err but rather something else... But either way it works for now, the thing up there doesn't matter that much.

  const userID = req.body.userID;
  const roomID = req.body.roomID;

  if (err instanceof multer.MulterError) {
    console.log(`err: ${err}`)
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return new Error("Exceed file limit size");
      default:
        return next(new Error("Can't upload the file\n"));
    }
  } else if (err) {
    console.log(err)
    console.log(err())
  }

  try {
    console.log(req.file)
    let path_components = req.file.path.split('/')
    console.log(path_components)
    let audio_link = `${DOMAIN_NAME}/${path_components[1]}/${path_components[2]}`
    let text = "text";
    // save the audio information
    saveAudioMongo(userID, roomID, audio_link, text)
        .then(audioID => {
          // update audio history in room
          err = updateRoomInfo(roomID, audioID);
          if (err) throw err
        })
    return res.status(200).send({success: true, link: audio_link,transcript: text})
  } catch (error) {
    console.log("Dead")
    res.status(500).send({success: false, error})
  }
})


const saveAudioMongo = async (userID, chatroomID, audioLink,transcript) => {

  const audio = await Audio.create({
    user: userID,
    room: chatroomID,
    audioLink: audioLink,
    transcript: transcript
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
    saveAudioMongo(userID, roomID, audioLink,transcript)
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
