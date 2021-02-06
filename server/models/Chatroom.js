const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  name: {
    type:String,
    maxlength:50
  },
  task: {
    type:String,
    maxlength:50
  },
  // user1 gives command
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      
  },
  // user2 receive command and shoot back response.
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      
  },
  // content_type decides the input type that users will provide 0 - audio, 1 - message
  content_type: {
    type: Number,
    default: 0,
    min: 0,
    max: 1,
  },
  audioList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audio'
  }]
  // need to design some stuff for intent.
  // intent goes here
})


const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = { Chatroom }
