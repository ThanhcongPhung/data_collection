const express = require('express');
const router = express.Router();
const {Audio} = require("../models/Audio");
const speechScorer = require("word-error-rate");

router.post("/", (req, res) => {
  const listArray = req.body.listAudio
  const listResponse=[]
  listArray.map(ele=>{
    if(ele.origin_transcript===null){
      const response = {
        audioId: ele._id,
        point: null
      }
      listResponse.push(response)
    }else {
      const point = speechScorer.wordErrorRate(ele.origin_transcript, ele.bot_transcript);
      const point_convert = (Math.round(point * 100)).toFixed(2)
      console.log()
      const response = {
        audioId: ele._id,
        point: point_convert
      }

      listResponse.push(response)
    }
  })
  console.log(listResponse)
  try{
    listResponse.map(ele=>{
      Audio.updateOne({_id: ele.audioId}, {$set: {wer: ele.point}}, function (err, res) {
        if (err) throw err;
        console.log("wer updated")
      })
    })
  }catch (e){
    res.json({ok: false, msg: 'cannot update R'})
  }
  res.json({ok: true, listPoint: listResponse})
})
module.exports = router;
