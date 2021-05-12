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
  },
  audioLink: {
    type: String,
    unique: true,
  },
  transcript: {
    type: String,
  },
  audioStyle: {
    type: String,
  },
  //0: import,1:record
  recordDevice: {
    type: String,
  },
  fixBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  //true: validated,false: no
  isValidate: {
    type: Boolean,
  },
  origin_transcript: {
    type: String,
  },
  bot_transcript: {
    type: String
  },
  final_transcript: {
    type: String,
  },
  duration: {
    type: String,
  },
  wer: {
    type: Number,
  },
  isLike: {
    type: Boolean,
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
  },
  speaker_id:{
    type:String,
  }

}, {timestamps: true});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = {Audio}
