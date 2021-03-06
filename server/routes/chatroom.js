const express = require('express');
const router = express.Router();
const {Chatroom} = require("../models/Chatroom");


// GET ALL
router.get("/", (req, res) => {

  Chatroom.find()
      .exec((err, roomFound) => {
        if (err) res.status(500).send({success: false, err})
        return res.status(200).send({
          success: true,
          roomFound
        })
      });

})

// GET ONE
router.get("/:roomID", (req, res) => {
  Chatroom.findById(req.params.roomID)
      .populate('intent')
      .populate({
        path: 'audioList',
        populate: {
          path: 'user',
        }
      })
      .exec((err, roomFound) => {
        if (err) res.status(500).send({success: false, err})
        else if (!roomFound) res.status(404).send({success: false, message: "Room not found"})
        else res.status(200).send({success: true, roomFound})
      })
})
// GET ALL AUDIOS OF ONE ROOM
router.get("/:roomID/history", (req, res) => {
  Chatroom.findById(req.params.roomID, (err, roomFound) => {
    let history = roomFound.audioList;
    if (err) res.status(500).send({success: false, err})
    else if (!roomFound) res.status(404).send({success: false, message: "Room not found"})
    else res.status(200).send({success: true, history})
  })
})
// GET RANDOM
router.get("/random", (req, res) => {

  // Get the count of all records
  Chatroom.estimatedDocumentCount().exec((err, count) => {
    if (err) res.status(500).send({success: false, err})
    // Get a random entry 
    var random = Math.floor(Math.random() * count)
    Chatroom.findOne().skip(random).exec((err, roomFound) => {
      if (err) res.status(500).send({success: false, err})
      return res.status(200).send({
        success: true,
        roomFound
      })
    })
  })
})
router.delete("/delete/:roomId", (req, res) => {
  const roomID = req.params.roomId;
  Chatroom.deleteOne({_id: roomID}, function (err, temps) {
    if (err) {
      res.status(500).send({status: 0, error: err});
    } else {
      res.status(200).send({status: 1});
    }
  })
})
router.post("/", async (req, res) => {

  const {name, task, content_type} = req.body;

  const chatroom = new Chatroom({
    name,
    task,
    content_type,
  })

  chatroom.save((err, roomCreated) => {
    if (err) return res.json({success: false, err});
    return res.status(201).json({
      success: true,
      roomCreated
    });
  });

})

// GET ALL AUDIOS OF ONE ROOM
router.get("/:roomID/history", (req, res) => {
  Chatroom.findById(req.params.roomID, (err, roomFound) => {
    let history = roomFound.audioList;
    if (err) res.status(500).send({success: false, err})
    else if (!roomFound) res.status(404).send({success: false, message: "Room not found"})
    else res.status(200).send({success: true, history})
  })
})

router.delete("/deleteRoom/:roomId", (req, res) => {
  const roomID = req.params.roomId;
  Chatroom.deleteOne({_id: roomID}, function (err, temps) {
    if (err) {
      return res.send(new Error('Error Remove'));
    } else {
      res.json({ok: "ok"})
    }
  })
})
module.exports = router;
