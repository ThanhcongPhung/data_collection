const express = require('express');
const router = express.Router();
const { Chatroom } = require("../models/Chatroom");

// const { auth } = require("../middleware/auth");

// GET ALL
router.get("/", (req, res) => {

  Chatroom.find({})
    // .populate('user1') //not use this yet... populate will bring every information of 'user1' to the table, instead of just the id.
    .exec((err, roomFound) => {
      // .send() lets the browser automatically assign Content-Type 
      // whereas .json() specifies Content-Type as json type.
      if (err) res.status(500).send({ success: false, err })
      return res.status(200).send({
        success: true,
        roomFound
      })
    });
    
})

// GET ONE
router.get("/:roomID", (req, res) => {
  Chatroom.findById(req.params.roomID)
      .populate('audioList')
      .exec((err, roomFound) => {
        if (err) res.status(500).send({ success: false, err })
        else if (!roomFound) res.status(404).send({ success: false, message: "Room not found" })
        else res.status(200).send({ success: true, roomFound })
      })
})
// GET ALL AUDIOS OF ONE ROOM
router.get("/:roomID/history", (req, res) => {
  Chatroom.findById(req.params.roomID, (err, roomFound) => {
    let history = roomFound.audioList;
    if (err) res.status(500).send({ success: false, err })
    else if (!roomFound) res.status(404).send({ success: false, message: "Room not found" })
    else res.status(200).send({ success: true, history })
  })
})
// GET RANDOM
router.get("/random", (req, res) => {

  // Get the count of all records
  Chatroom.estimatedDocumentCount().exec((err, count) => {
    if (err) res.status(500).send({ success: false, err })
    // Get a random entry 
    var random = Math.floor(Math.random() * count)
    Chatroom.findOne().skip(random).exec((err, roomFound) => {
      if (err) res.status(500).send({ success: false, err })
      return res.status(200).send({
        success: true,
        roomFound
      })
    })
  })
})

router.post("/", async (req, res) => {

  const { name, task, content_type } = req.body;

  const chatroom = new Chatroom({
    name,
    task,
    content_type,
  })

  chatroom.save((err, roomCreated) => {
    if (err) return res.json({ success: false, err});
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
    if (err) res.status(500).send({ success: false, err })
    else if (!roomFound) res.status(404).send({ success: false, message: "Room not found" })
    else res.status(200).send({ success: true, history })
  })
})

module.exports = router;
