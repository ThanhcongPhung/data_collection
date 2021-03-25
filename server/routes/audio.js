const express = require('express');
const router = express.Router();
const {Audio} = require("../models/Audio");

// GET ONE
router.get("/:roomID", (req, res) => {
  Audio.find({"room": req.params.roomID})
      .populate("user")
      .exec((err, audios) => {
        // if (err) res.status(500).send({ success: false, err })
        // else if (!audios) res.status(404).send({ success: false, message: "Audio not found" })
        // else res.status(200).send({ success: true, audios })
        if (err) return res.status(400).send(err);
        res.status(200).send(audios)
      })
})
// GET ALL
router.get("/", (req, res) => {
  Audio.find()
      .exec((err, audios) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(audios)
      })
});
router.post("/import", (req,res) => {

  let listAudio = []
  req.body.audioList.forEach(element=>{
    const audio={
      user : req.body.user,
      room: null,
      audioLink: element.audio_link,
      transcript: element.transcript,
      audioStyle: req.body.audioStyle,
      recordDevice:0,
      fixBy: null,
      isValidate:false,
    }
    listAudio.push(audio)
  })
  console.log(listAudio)
  Audio.create(listAudio, function (err, temps) {
    if (err) {
      return res.send(new Error('Error saving'));
    }else{
      res.json({ok :"ok"})
    }
  });

})
module.exports = router;
