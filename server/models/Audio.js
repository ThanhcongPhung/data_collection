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
    default: null,
  },

  // revertable means whether the room's progress needs to be changed if the audio is deleted
  // false: audio gone and room's progress stays the same.
  // true: audio gone and room's progress will be changed. 
  revertable: {
    type: Boolean,
    required: true,
    default: false,
  }
})

const Audio = mongoose.model('Audio', audioSchema);

module.exports = { Audio }