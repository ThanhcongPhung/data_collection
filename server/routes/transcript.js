const {LongTranscript} = require("../models/LongTranscript")
const express = require('express');
const axios = require("axios");
const router = express.Router();
const {
  ASR_SERVER_NODE,
  ASR_URL,
  ASR_AUTH_KEY,
} = require('../configs');

function transcriptGoogle(audio_link,id) {
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

  await saveAudioURLMongo(audio_link,transcript)
      .then(async audioID => {
        await transcriptGoogle(audio_link,audioID)
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

module.exports = router;