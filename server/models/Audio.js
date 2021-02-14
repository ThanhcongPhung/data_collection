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
  }
})

// update intent
// update audio's intent

// messageSchema.statics.updateAudio = 


const Audio = mongoose.model('Audio', audioSchema);

module.exports = { Audio }