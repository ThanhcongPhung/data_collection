const express = require('express');
const router = express.Router();
const uploadService = require('../services/upload')
const multer = require('multer')
const {Audio} = require("./../models/Audio");
const {Chatroom} = require("./../models/Chatroom");
const {User} = require("./../models/User")
const DOMAIN_NAME = "http://localhost:5000/public/audio"

router.post('/file', uploadService.upload.single('soundBlob'), (req, res, err) => {

  // the err ^^^^^^ there doesn't seem to be err but rather something else... But either way it works for now, the thing up there doesn't matter that much.

  const userID = req.body.userID;
  const roomID = req.body.roomID;

  if (err instanceof multer.MulterError) {
    console.log(`err: ${err}`)
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return new Error("Exceed file limit size");
        // case 'LIMIT_PART_COUNT':
        //   return next(
        //     new CustomError(errorCodes.LIMIT_PART_COUNT, err.message),
        //   );
        // case 'LIMIT_FILE_COUNT':
        //   return next(
        //     new CustomError(errorCodes.LIMIT_FILE_COUNT, err.message),
        //   );
        // case 'LIMIT_FIELD_KEY':
        //   return next(new CustomError(errorCodes.LIMIT_FIELD_KEY, err.message));
        // case 'LIMIT_FIELD_VALUE':
        //   return next(
        //     new CustomError(errorCodes.LIMIT_FIELD_VALUE, err.message),
        //   );
        // case 'LIMIT_FIELD_COUNT':
        //   return next(
        //     new CustomError(errorCodes.LIMIT_FIELD_COUNT, err.message),
        //   );
        // case 'LIMIT_UNEXPECTED_FILE':
        //   return next(
        //     new CustomError(errorCodes.LIMIT_UNEXPECTED_FILE, err.message),
        //   );
      default:
        return next(new Error("Can't upload the file\n"));
    }
  } else if (err) {
    console.log(err)
    console.log(err())
  }

  try {
    let path_components = req.file.path.split('\\')
    let audio_link = `${DOMAIN_NAME}/${path_components[path_components.length - 4]}/${path_components[path_components.length - 3]}/${path_components[path_components.length - 2]}/${path_components[path_components.length - 1]}`
    let text = "text";
    // save the audio information
    saveAudioMongo(userID, roomID, audio_link, text)
        .then(audioID => {
          // update audio history in room
          err = updateRoomInfo(roomID, audioID);
          if (err) throw err
        })
    return res.status(200).send({success: true, link: audio_link})
  } catch (error) {
    console.log("Dead")
    res.status(500).send({success: false, error})
  }
})


const saveAudioMongo = async (userID, chatroomID, link, text) => {

  const audio = await Audio.create({
    user: userID,
    room: chatroomID,
    link: link,
    text: text
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
module.exports = router;
