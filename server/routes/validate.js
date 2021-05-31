const express = require('express');
const router = express.Router();
const {Audio} = require("../models/Audio");
const {Validate} = require('../models/Validate')
const {ValidateRoom} = require('../models/ValidateRoom')


router.post("/", (req, res) => {
  const userID = req.body.userID
  const audioID = req.body.audioID
  const upvoteTime = req.body.upVoteTime
  const transcript = req.body.transcript;
  const roomId=req.body.room_id;
  Validate.findOne({user: userID}, function (err, existingUser) {
    if (!err && existingUser) {
      existingUser.up_vote.push({audio: audioID, up_vote_time: upvoteTime})
      return existingUser.save();
    } else {
      Validate.create({
        user: userID,
        up_vote: [{audio: audioID, up_vote_time: upvoteTime}],
        down_vote: [],
      })
    }
  })
  ValidateRoom.findById(roomId)
      .then(room => {

        if (!room) {
          console.log("Can't find room to update transcript!");
          res.status(404).send({success: false, message: "room not found"});
          throw "Can't find audio"
        } else {

          room.validatedAudio.push(audioID);
          return room.save();
        }
      })
      .then(audioUpdated => res.status(200).send({success: true, audioUpdated}))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })

  Audio.findById(audioID)
      .then(audio => {

        if (!audio) {
          console.log("Can't find audio to update transcript!");
          res.status(404).send({success: false, message: "Audio not found"});
          throw "Can't find audio"
        } else {
          audio.isValidate =true;
          audio.final_transcript = transcript
          audio.up_vote.push({user: userID, up_vote_time: upvoteTime});
          return audio.save();
        }
      })
      .then(audioUpdated => res.status(200).send({success: true, audioUpdated}))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })
})

router.post("/update", (req, res) => {
  const userID = req.body.userID
  const audioID = req.body.audioID
  const downVoteTime = req.body.downVoteTime
  const transcript = req.body.transcript
  const roomId=req.body.room_id;

  // console.log(userID,audioID,downVoteTime,transcript)
  Validate.findOne({user: userID}, function (err, existingUser) {
    if (!err && existingUser) {
      existingUser.down_vote.push({audio: audioID, down_vote_time: downVoteTime,new_transcript: transcript})
      return existingUser.save();
    } else {
      Validate.create({
        user: userID,
        up_vote: [],
        down_vote: [{audio: audioID,down_vote_time: downVoteTime,new_transcript: transcript}],
      })
    }
  })
  ValidateRoom.findById(roomId)
      .then(room => {

        if (!room) {
          console.log("Can't find room to update transcript!");
          res.status(404).send({success: false, message: "room not found"});
          throw "Can't find audio"
        } else {

          room.validatedAudio.push(audioID);
          return room.save();
        }
      })
      .then(audioUpdated => res.status(200).send({success: true, audioUpdated}))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })
  Audio.findById(audioID)
      .then(audio => {

        if (!audio) {
          console.log("Can't find audio to update transcript!");
          res.status(404).send({success: false, message: "Audio not found"});
          throw "Can't find audio"
        } else {
          audio.isValidate=true;
          audio.final_transcript = transcript;
          audio.down_vote.push({user: userID, down_vote_time: downVoteTime,new_transcript: transcript});
          return audio.save();
        }
      })
      .then(audioUpdated => res.status(200).send({success: true, audioUpdated}))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })
  // res.json({ok: true, msg: 'update oke'})
})
router.get("/:userID", (req, res) => {
  const userID = req.params.userID
  console.log("userid",userID)
  Validate.find({user: userID})
      .exec((err, audios) => {
        if (err) return res.status(400).send(err);
        // console.log(audios[0])
        res.status(200).send(audios[0])
      })
})
module.exports = router;
