const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  text:{
    type: String,
    required:true,
  },
},{timestamps:true});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = {Audio}
