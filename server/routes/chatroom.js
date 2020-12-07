const express = require('express');
const router = express.Router();
const { Chatroom } = require("../models/Chatroom");

const { auth } = require("../middleware/auth");

router.post("/", async (req, res) => {

  const chatroom = new Chatroom(req.body)
  
  chatroom.save((err, doc) => {
    if (err) return res.json({ success: false, err});
    console.log(doc)
    return res.status(200).json({
      success: true
    });
  });
  
})

module.exports = router;