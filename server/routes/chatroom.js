const express = require('express');
const router = express.Router();
const { Chatroom } = require("../models/Chatroom");
// const { Intent } = require("../models/Intent");
// const { auth } = require("../middleware/auth");

// GET ALL
router.get("/", (req, res) => {

  Chatroom.find({})
    // .populate('user1') //not use this yet... populate will bring every information of 'user1' to the table, instead of just the id.
    .populate('progress')
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
    if (err) res.status(500).send({ success: false, message: "Can't estimate document count", err })
    // Get a random entry 
    var random = Math.floor(Math.random() * count)
    Chatroom.findOne().skip(random)
    // .populate('intent')
    .populate('progress')
    .exec((err, roomFound) => {
      if (err) res.status(500).send({ success: false, message: "Can't proceed to find any room", err })
      return res.status(200).send({
        success: true,
        roomFound
      })
    })
  })
})

// GET ONE
router.get("/:roomID", (req, res) => {
  Chatroom.findById(req.params.roomID)
  .populate('intent')
  .populate('progress')
  .populate('audioList')
  .exec((err, roomFound) => {
    if (err) res.status(500).send({ success: false, err })
    else if (!roomFound) res.status(404).send({ success: false, message: "Room not found" })
    else res.status(200).send({ success: true, roomFound })
  })
})

// GET ALL AUDIOS OF ONE ROOM
router.get("/:roomID/history", (req, res) => {
  Chatroom.findById(req.params.roomID, (err, roomFound) => {
    let history = roomFound.audioList;
    if (err) res.status(500).send({ success: false, err })
    else if (!roomFound) res.status(404).send({ success: false, message: "Room not found" })
    else res.status(200).send({ success: true, history })
  })
})

// CREATE A ROOM
router.post("/", async (req, res) => {

  const { name, task, content_type } = req.body;

  const chatroom = new Chatroom({
    name,
    task,
    content_type,
  })

  chatroom.save((err, roomCreated) => {
    if (err) return res.json({ success: false, err});
    return res.status(201).json({
      success: true,
      roomCreated
    });
  });
})

const { Audio } = require("../models/Audio");
const { Progress } = require("../models/Progress");

// REMOVE AUDIO
router.put("/:roomID/:userRole", (req, res) => {
  const roomID = req.params.roomID;
  const userRole = req.params.userRole;
  Chatroom.findById(roomID)
  .then( async (roomFound) => {
    if (!roomFound) res.status(404).send({ success: false, message: "Room not found" });
    else {

      // check turn
      if (!((userRole === "client" && roomFound.turn === 1) || (userRole === "servant" && roomFound.turn === 2))) {
        res.status(409).send({ success: 0, message: "You have to wait for your turn!" });
        return
      } 

      // check if there's anything to delete
      if (roomFound.audioList.length === 0) {
        res.status(406).send({ success: -1, message: "There's nothing to delete!" });
        return
      }

      // remove the latest audio and get its ID (OPTIONAL: Log it to a file)
      const latestAudioID = roomFound.audioList.pop();

      // LOG TO A FILE!!!

      const progressID = roomFound.progress;
  
      // get the intent of the removed audio
      const audioIntent = 
        await Audio.findById(latestAudioID)
        .populate('intent')
        .then(audioFound => {
          if (!audioFound) {
            res.status(404).send({ success: -2, message: "Audio not found!" })
          } else {
            // check audio's revertable status. If false, then no need to update intent, return null. Else return intent and let's update progress.
            if (audioFound.revertable) {
              return audioFound.intent;
            } else return null;
          }
        })
        .catch(err => console.log("Yikes... Removing audio... handling audio: ", err))
      
      // maybe I don't need to update progress since it'll never be in such state. But it's better safe than sorry. Maybe we'll change the policy for that later on.
      // If null, then no need to update intent. Else let's update progress.
      if (audioIntent !== null) {
        const  { action, device, floor, room, scale, level } = audioIntent;
        const target = { action, device, floor, room, scale, level };

        console.log("Target: ", target);

        // update progress
        let err = await Progress.findById(progressID)
        .then(progressFound => {
          for (let key in target) {
            if(target[key] !== null) {
              if (progressFound[key] === -1) {
                // return res.status(500).send({ success: -3, message: "Something's wrong with the server. PUT... chatroom... Updating progress..." });
                return "Something's wrong with the server. PUT... chatroom... Updating progress...";
              } else if (progressFound[key] === 0) {
                // return res.status(500).send({ success: -3, message: "Something's wrong with the server. Maybe the audio is already deleted and progress is already updated!" });
                return "Something's wrong with the server. Maybe the audio is already deleted and progress is already updated!";
              } else {
                progressFound[key]--;
              }
            }
          }
          
          // return null
          return progressFound.save((err, progressUpdated) => {
            if (err) return err;
            else return null;
          });
        })
        .catch(err => console.log("Yikes... Removing audio... handling progress: ", err))
        
        if (err !== null) console.log(err);
      }
      
      // update turn
      if (roomFound.turn === 1) {
        roomFound.turn = 3;
      } else if (roomFound.turn === 2) {
        roomFound.turn = 1;
      } else {
        // If somehow they can bypass the "check turn" floodgate, it will lead to this message. How to prevent that though :/
        res.status(200).send({ success: 0, message: "How did you even do this...? Removing audio... Update room turn... " });
        return
      }

      return roomFound.save((err, roomUpdated) => {
        if (err) res.status(500).send({ success: -3, message: err});
        return res.status(200).send({ success: 1, message: 'Remove audio successfully!' });
      })
    }
  });
})

// DELETE A ROOM
// router.delete("/:roomID", (req, res) => {
//   Chatroom.findByIdAndDelete(req.params.roomID, (err, roomDeleted) => {
//     if (err) res.status(500).send({ success: false, err })
//     else if (!roomDeleted) res.status(404).send({ success: false, message: "Room not found" })
//     else {
//       console.log(roomDeleted)
//       const audioList = roomDeleted.audioList
//       const intent = 
//       // Delete audio record 
//       Audio.
//       // Write in the log about that record, write ID and intent of the audio if there's any.

//       // Delete Intent

//       // Delete Progress
//     }
//   })
// })

module.exports = router;