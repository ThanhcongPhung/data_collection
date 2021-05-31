const express = require('express');
const router = express.Router();
const {Audio} = require("../models/Audio");
const {Validate} = require('../models/Validate')
const {ValidateRoom} = require('../models/ValidateRoom')

router.post("/create", (req, res) => {
  const name = req.body.name;
  const audioList = req.body.listAudio;
  const audioId = []
  audioList.map(ele => audioId.push(ele._id))
  ValidateRoom.create({
    name: name,
    audioList: audioId,
  }).then(data => {
        res.status(200).send({status: 1})
      }
  ).catch(err => {
    res.status(401).send({status: 0, message: err})
  })
})
router.get("/", (req, res) => {

  ValidateRoom.find()
      .populate({
        path: 'audioList',
        populate: {
          path: 'user',
        }
      })
      .populate("user")
      .exec((err, rooms) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(rooms)
      })
})
router.put("/", (req, res) => {
  const id = req.body._id;
  const user_id = req.body.user_id;
  ValidateRoom.findById(id)
      .then(room => {
        if (!room) {
          console.log("Can't find room");
          res.status(404).send({status: 0, message: "room not found"});
          throw "Can't find room"
        } else {
          room.user = user_id;
          room.status = 1;
          return room.save();
        }
      })
      .then(audioUpdated => res.status(200).send({status: 1}))
      .catch(err => {
        res.status(500).send({status: 0, message: err})
      })
})
module.exports = router;
