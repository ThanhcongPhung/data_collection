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
router.get("/getAll", (req, res) => {

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
router.get("/:roomID", (req, res) => {
  ValidateRoom.findById(req.params.roomID)
      .populate({
        path:'audioList',
        populate:{
          path:'user',
        }
      })
      .exec((err, roomFound) => {
        if (err) res.status(500).send({ success: false, err })
        else if (!roomFound) res.status(404).send({ success: false, message: "Room not found" })
        else res.status(200).send({ success: true, roomFound })
      })
})
router.put("/join", (req, res) => {
  const id = req.body.room_id;
  const user_id = req.body.user_id;
  console.log(req.body)
  ValidateRoom.findById(id)
      .then(room => {
        if (!room) {
          console.log("Can't find room");
          res.status(404).send({status: 0, message: "room not found"});
          throw "Can't find room"
        } else {
          if(room.user===null){
            room.user = user_id;
            room.status = 1;
            return room.save();
          }else{
            return res.status(500).send({status: 0, message: "Đã có người tham gia"})
          }

        }
      })
      .then(audioUpdated => res.status(200).send({status: 1}))
      .catch(err => {
        res.status(500).send({status: 0, message: err})
      })
})
module.exports = router;
