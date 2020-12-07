const express = require('express');
const router = express.Router();
const { Chatroom } = require("../models/Chatroom");

const { auth } = require("../middleware/auth");

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