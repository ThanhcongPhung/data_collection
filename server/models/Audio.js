const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({

  // who created this audio
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // room: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Chatroom',
  //   required: true,
  // },

  link: {
    type: String,
    required: true,
    unique: true,
  },

  intent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Intent',
  }
})

const Audio = mongoose.model('Audio', audioSchema);

module.exports = { Audio }