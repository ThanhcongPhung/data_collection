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

  const { name, task } = req.body;

  const chatroom = new Chatroom({
    name,
    task,
  })

  chatroom.save((err, roomCreated) => {
    if (err) return res.json({ success: false, err});
    return res.status(200).json({
      success: true,
      roomCreated
    });
  });
  
})

module.exports = router;