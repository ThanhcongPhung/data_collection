const express = require('express');
const router = express.Router();
const { Message } = require("../models/Message");

// GET ALL
router.get("/", (req, res) => {
  Message.find({})
  .exec((err, messagesFound) => {
    if (err) res.status(500).send({ success: false, err })
    return res.status(200).send({
      success: true,
      messagesFound,
    })
  })
})

// GET ONE
router.get("/:messageID", (req, res) => {
  Message.findById(req.params.messageID, (err, messageFound) => {
    if (err) res.status(500).send({ success: false, err })
    else if (!messageFound) res.status(404).send({ success: false, message: "Message not found" })
    else res.status(200).send({ success: true, messageFound })
  })
})

// UPLOAD MESSAGE
router.post("/", (req, res) => {
  const { chatroom, user, message } = req.body;

  const new_message = new Message({
    // chatroom,
    user,
    message,
  })

  new_message.save((err, messageCreated) => {
    if (err) return res.json({ success: false, err });
    return res.status(201).json({
      success: true,
      messageCreated
    })
  })
})

router.delete("/:messageID", (req, res) => {
  Message.findByIdAndDelete(req.params.messageID, (err, messageDeleted) => {
    if (err) res.status(500).send({ success: false, err })
    else if (!messageDeleted) res.status(404).send({ success: false, massage: "Message not found" })
    else res.status(200).send({ success: true, message: "Delete successfully" })
  })
})

module.exports = router;