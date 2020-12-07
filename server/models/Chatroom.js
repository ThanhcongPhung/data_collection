const mongoose = require('mongoose');


const chatroomSchema = new mongoose.Schema({
  name: {
    type:String,
    maxlength:50
  },
})


const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = { Chatroom }
