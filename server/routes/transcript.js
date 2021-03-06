const {LongTranscript} = require("../models/LongTranscript")
const express = require('express');
const axios = require("axios");
const router = express.Router();
const {
  ASR_SERVER_NODE,
  ASR_URL,
  ASR_AUTH_KEY,
} = require('../configs');
const {Audio} = require("./../models/Audio");
const fs = require('fs');

function transcriptGoogle(audio_link, id) {
  return new Promise(function (resolve, reject) {
    try {
      axios({
        method: 'GET',
        url: `${ASR_URL}/api/v1/stt?url=${audio_link}?callback=${ASR_SERVER_NODE}/api/transcript/callback?id=${id}`,
        headers: {
          'Authorization': "Bearer " + `${ASR_AUTH_KEY}`,
        },
      }).then(res => {
        if (res.data.status === 1) {
          console.log(res.data)
          resolve(res.data.result.transcription)
        } else {
          reject(res.data.message)
        }

      })
    } catch (e) {
      console.log(e)
    }

  })
}

router.post('/', async (req, res) => {
  const audio_link = req.body.link;
  const transcript = "";

  await saveAudioURLMongo(audio_link, transcript)
      .then(async audioID => {
        await transcriptGoogle(audio_link, audioID)
        res.status(200).send({success: true, audio_id: audioID})
        // update audio history in room
      })
      .catch(err => {
        console.log(err)
      })
  // LongTranscript.create(longTranscript, function (err, temps) {
  //   if (err) {
  //     res.status(500).send({ status: 0, error: err });
  //   } else {
  //     res.status(200).send({ status: 1 });
  //   }
  // });
})
router.post('/callback?id=', async (req, res) => {
  const audio_id = req.params.id;
  const transcript = req.body.transcript;


  LongTranscript.findById(audio_id)
      .then(audio => {

        if (!audio) {
          console.log("Can't find audio to update transcript!");
          res.status(404).send({success: false, message: "Audio not found"});
          throw "Can't find audio"
        } else {
          audio.transcript = transcript;
          return audio.save();
        }
      })
      .then(audioUpdated => res.status(200).send({success: true, audioUpdated}))
      .catch(err => {
        res.status(500).send({success: false, message: err})
      })
})
const saveAudioURLMongo = async (audio_link, transcript) => {

  const long_transcript = await LongTranscript.create({
    audio_link: audio_link,
    transcript: transcript,
  })

  return long_transcript._id
}
router.get("/export", async (req, res) => {
  const exportFolder = `/home/congpt/GR/`;
  const longTranscriptExportFile = "LongTranscript.json";

  await LongTranscript.find()
      .then((scriptFound) => {
        console.log(scriptFound)
        // exportObject(exportFolder + longTranscriptExportFile, scriptFound)
        res.status(200).send({status: 1});

      })
      .catch(err => {
        res.status(500).send({status: 0, error: err});
        throw err
      });
})
const exportObject = (destination, object) => {
  fs.writeFile(destination, JSON.stringify(object), (err) => {
    // return doesn't work...
    if (err) {
      console.log(err)
    }
  })
}

router.get("/getAll", (req, res) => {
  Audio.find()
      .exec((err, audios) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(audios)
      })
});
router.post("/export-audio", async (req, res) => {
  const { destination } = req.body;
  const audios = await Audio.find()
      .populate("user")
      .populate("room")
      .exec();
  let result = [];
  audios.forEach(item => {
    // if(item.recordDevice!=="import"){
      let audio = {};
      audio.id = item._id;
      audio.userid = item.user._id;
      // console.log("room",item.room)
      if(item.room!==null){
        audio.topic = item.room.task;
        audio.room_name_asr = item.room.name;
      }else{
        audio.topic = "";
        audio.room_name_asr = "";
      }
      audio.room_name_slu = item.room_name;
      audio.user_accent = item.user.accent;
      audio.user_gender = item.user.gender;
      audio.user_age = item.user.age;
      audio.audio_name = item.audioLink.split('/')[-1];
      audio.username = item.username;
      audio.audioLink = item.audioLink;
      audio.transcript = item.transcript;
      audio.recordDevice = item.recordDevice;
      audio.isValidate = item.isValidate;
      audio.origin_transcript = item.origin_transcript;
      audio.bot_transcript = item.bot_transcript;
      audio.final_transcript = item.final_transcript;
      audio.duration = item.duration;
      audio.speaker_id = item.speaker_id;
      audio.up_vote = item.up_vote.length;
      audio.down_vote = item.down_vote.length;
      result.push(audio)
    // }
  })
  // console.log(result)
  // exportObject(destination, result)
  res.status(200).send({result: result});
});
module.exports = router;
