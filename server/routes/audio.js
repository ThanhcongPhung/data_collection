const express = require('express');
const router = express.Router();
const {Audio} = require("../models/Audio");

require('dotenv').config();
const formidable = require('formidable');
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'));

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
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  Audio.find({"isValidate": false})
      // Audio.find({wer: { $gt: 5, $lt: 101 }})
      .exec((err, audios) => {
        if (err) return res.status(400).send(err);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {}

        results.results = audios.slice(startIndex, endIndex)
        res.status(200).send(results)
      })
});


router.post("/import", (req, res) => {

  let listAudio = []
  req.body.audioList.forEach(element => {
    const audio = {
      user: req.body.user,
      room: element.room_id,
      audioLink: element.audio_link,
      transcript: element.transcript,
      audioStyle: req.body.audioStyle,
      recordDevice: "import",
      fixBy: null,
      username: element.speaker_name,
      isValidate: false,
      origin_transcript: element.transcript,
      bot_transcript: '',
      final_transcript: '',
      duration: element.duration,
      wer: null,
      up_vote: [],
      down_vote: [],
      speaker_id: element.speaker_id
    }
    listAudio.push(audio)
  })
  // console.log(listAudio)
  Audio.create(listAudio, function (err, temps) {
    if (err) {
      console.log(err)
      return res.status(500).send({status:0, message: err})

    } else {
      res.status(200).send({status:1})

    }
  });
})

router.put("/updateTranscript", (req, res) => {

  const audioID = req.body.audioID;
  const userID = req.body.userID;
  const transcript = req.body.transcript;
  // const isValid = req.body.isValid;
  console.log(req.body)
  Audio.findById(audioID)
      .then(audio => {

        if (!audio) {
          console.log("Can't find audio to update transcript!");
          res.status(404).send({success: false, message: "Audio not found"});
          throw "Can't find audio"
        } else {
          audio.transcript = transcript;
          audio.fixBy = userID;
          audio.isValidate = false;
          return audio.save();
        }
      })
      .then(audioUpdated => res.status(200).send({success: true, audioUpdated}))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })
})
router.put("/update", async (req, res) => {

  const audioID = req.body.audio_id;
  const transcript = req.body.final_transcript;
  const isValidate = req.body.isValidate;

  await Audio.findById(audioID)
      .then(audio => {

        if (!audio) {
          console.log("Can't find audio to update transcript!");
          res.status(404).send({success: false, message: "Audio not found"});
          throw "Can't find audio"
        } else {
          audio.final_transcript = transcript;
          audio.isValidate = isValidate;
          return audio.save();
        }
      })
      .then(audioUpdated => res.status(200).send({status:1, audioUpdated}))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })
})
router.put("/updateLike", (req, res) => {

  const audioID = req.body.audioID;
  const userID = req.body.userID;
  const isLike = req.body.isLike;
  const upVoteTime = req.body.upVoteTime;
  const transcript = req.body.transcript;
  // console.log(req.body)
  Validate.findOne({user: userID}, function (err, existingUser) {
    if (!err && existingUser) {
      existingUser.up_vote.push({audio: audioID, up_vote_time: upVoteTime})
      return existingUser.save();
    } else {
      Validate.create({
        user: userID,
        up_vote: [{audio: audioID, up_vote_time: upVoteTime}],
        down_vote: [],
      })
    }
  })
  Audio.findById(audioID)
      .then(audio => {

        if (!audio) {
          console.log("Can't find audio to update transcript!");
          res.status(404).send({success: false, message: "Audio not found"});
          throw "Can't find audio"
        } else {
          audio.isValidate = true;
          audio.isLike = isLike;
          audio.transcript=transcript;
          audio.up_vote.push({user: userID, upVoteTime: upVoteTime});
          return audio.save();
        }
      })
      .then(audioUpdated => res.status(200).send({success: true, audioUpdated}))
      .catch(err => {
        console.log(`Error while updating audio ${audioID} transcript... ${err}`)
        res.status(500).send({success: false, message: "Something's wrong internally, so sorry..."})
      })
})
router.delete("/deleteAudio/:audioId", (req, res) => {

  const audioID = req.params.audioId;
  Audio.deleteOne({_id: audioID}, function (err, temps) {
    if (err) {
      return res.send(new Error('Error Remove'));
    } else {
      res.json({ok: "ok"})
    }
  })
})
router.post("/deleteAll", (req, res) => {

  const listAudioId = req.body.listAudioId;
  // listAudioId.map(ele=>{
  //   console.log(ele)
  // })
  // console.log(listAudioId)
  Audio.deleteMany({_id: {$in: listAudioId}}, function (err, temps) {
    if (err) {
      return res.send(new Error('Error remove'));
    } else {
      res.json({ok: "ok", listAudioId: listAudioId})
    }
  })
})
const uploadFile = require("../utils/uploadFile")
const multer = require("multer");
const request = require("request");
const {Validate} = require("../models/Validate");


router.post("/uploadGetText", async (req, res) => {
  // const form = new formidable.IncomingForm();
  // form.parse(req, function(err, fields, files){
  //
  //   const oldPath = files.file.path+".wav";
  //   console.log(fields.userID)
  //   const rawData = fs.readFileSync(oldPath)
  //   const file =  "/home/congpt/GR/data_collection/server/public/upload/extract/AudioFile.zip_1618913842939/AudioFile/wav/program-0015-00001.wav"
  //
  //   const name="adsd2";
  //   const destination = "congpt"
  //   console.log(oldPath)
  //   uploadFile(oldPath,destination,name)
  //       .then(res=>{
  //         console.log(res)
  //       })
  //
  // })
  // form.parse(req, function(err, fields, files){
  //
  //   const oldPath = files.file.path;
  //   const rawData = fs.readFileSync(oldPath)
  //   console.log(rawData)
  // const file =  "/home/congpt/GR/data_collection/server/public/upload/extract/AudioFile.zip_1618913842939/AudioFile/wav/program-0015-00001.wav"
  // const name="adsd1";
  // const destination = "congpt"
  // uploadFile(file,destination,name)
  //     .then(res=>{
  //       console.log(res)
  //     })
  //
  //   // // var newPath = path.join(__dirname, 'uploads')
  //   // //     + '/'+files.profilePic.name
  //   // var rawData = fs.readFileSync(oldPath)
  //
  //   // fs.writeFile(newPath, rawData, function(err){
  //   //   if(err) console.log(err)
  //   //   return res.send("Successfully uploaded")
  //   // })
  // })
  // request.get({
  //   url: 'http://43.239.223.87:3087/api/v1/stt?url=https://dev-asr.iristech.club/public/upload/extract/AudioFile.zip_1618915343291/AudioFile/wav/program-0015-00001.wav',
  //   headers: {
  //     Authorization: "Bearer zyvZQGPrr6qdbHLTuzqpCmuBgW3TjTxGKEEIFCiy1lCAOzTBtrqPYdPdZ1AtMxU2"
  //   }
  // }, function (error, response, body) {
  //   console.log(response.body);
  //   // if (!error && response.status == 1) {
  //   //   // Successful call
  //   //   var results = JSON.parse(body);
  //   //   console.log(results) // View Results
  //   // }
  // });

  // const form = {
  //   destination: "congpt",
  //   name: "congpt",
  //   file: "/home/congpt/GR/data_collection/server/public/upload/extract/AudioFile.zip_1618913842939/AudioFile/wav/program-0015-00001.wav",
  // };
  // const formData = querystring.stringify(form);
  // const contentLength = formData.length;
  //
  // request({
  //   headers: {
  //     // 'Content-Length': contentLength,
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': 'Bearer zyvZQGPrr6qdbHLTuzqpCmuBgW3TjTxGKEEIFCiy1lCAOzTBtrqPYdPdZ1AtMxUo2',
  //   },
  //   uri: 'http://43.239.223.87:3087/api/v1/stt?url=https://dev-asr.iristech.club/public/upload/extract/AudioFile.zip_1618915343291/AudioFile/wav/program-0015-00001.wav',
  //   // body: formData,
  //   method: 'GET'
  // }, function (err, res, body) {
  //   //it works!
  //   console.log(res.body)
  // });

  // const oldPath = files.file.path;
  // const reader = fs.createReadStream("/home/congpt/GR/data_collection/server/public/upload/extract/AudioFile.zip_1618913842939/AudioFile/wav/program-0015-00001.wav")
  // const form = {
  //   destination: "congpt",
  //   name: "congpt",
  //   file: "/home/congpt/GR/data_collection/server/public/upload/extract/AudioFile.zip_1618913842939/AudioFile/wav/program-0015-00001.wav",
  // };
  // const formData = querystring.stringify(form);
  // const contentLength = formData.length;
  //
  // request({
  //   headers: {
  //     'Content-Length': contentLength,
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': 'Bearer zyvZQGPrr6qdbHLTuzqpCmuBgW3TjTxGKEEIFCiy1lCAOzTBtrqPYdPdZ1AtMxUo2',
  //   },
  //   uri: 'http://43.239.223.87:5087/api/v1/uploads/file',
  //   body: formData,
  //   method: 'POST'
  // }, function (err, res, body) {
  //   //it works!
  //   console.log(res.body)
  // });

})
module.exports = router;
