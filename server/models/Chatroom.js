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
  // need to design some stuff for intent.
  // intent goes here
})


const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = { Chatroom }
