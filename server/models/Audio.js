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
  },
  username: {
    type: String,
    required: false,
    default: null,
  },
  audioLink: {
    type: String,
    unique: true,
    default: null,
  },
  transcript: {
    type: String,
    default: null,
  },
  audioStyle: {
    type: String,
    default: null,
  },
  //0: import,1:record
  recordDevice: {
    type: String,
    default: null,
  },
  fixBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  //true: validated,false: no
  isValidate: {
    type: Boolean,
    default: null,
  },
  origin_transcript: {
    type: String,
    default: null,
  },
  bot_transcript: {
    type: String,
    default: null,
  },
  final_transcript: {
    type: String,
    default: null,
  },
  duration: {
    type: String,
    default: null,
  },
  wer: {
    type: Number,
    default: null,
  },
  isLike: {
    type: Boolean,
    default: null,
  },
  up_vote: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // default: [],
    },
    up_vote_time: {
      type: String,
    }
  },
  ],
  down_vote: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    down_vote_time: {
      type: String,
    },
    new_transcript: {
      type: String,
    }
  },
  ],
  audio_name: {
    type: String,
    default: null,
  },
  speaker_id:{
    type:String,
    default: "",
  },
  room_name:{
    type:String,
    default: "",
  }
}, {timestamps: true});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = {Audio}
