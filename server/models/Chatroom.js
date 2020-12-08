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
  // need to design some stuff for intent.
  // intent goes here
})


const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = { Chatroom }
