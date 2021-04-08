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
  Audio.find({"isValidate":false})
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
      username: req.body.username,
      isValidate:false,
      origin_transcript:element.transcript,
      bot_transcript: '',
      final_transcript:'',
      duration:element.duration
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

router.put("/updateTranscript", (req, res) => {

  const audioID = req.body.audioID;
  const userID = req.body.userID;
  const transcript  = req.body.transcript;
  const isValid = req.body.isValid;
  console.log(req.body)
  Audio.findById(audioID)
      .then(audio => {

        if(!audio) {
          console.log("Can't find audio to update transcript!");
          res.status(404).send({ success: false, message: "Audio not found" });
          throw "Can't find audio"
        } else {
          audio.transcript = transcript;
          audio.fixBy = userID;
          audio.isValidate = isValid;
          return audio.save();
        }
      })
      .then(audioUpdated => res.status(200).send({ success: true, audioUpdated }))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })

})
router.delete("/deleteAudio/:audioId", (req, res) => {

  const audioID = req.params.audioId;
  Audio.remove({_id: audioID},function (err, temps) {
    if (err) {
      return res.send(new Error('Error saving'));
    }else{
      res.json({ok :"ok"})
    }
  })


})
module.exports = router;
