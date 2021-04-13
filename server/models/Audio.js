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
  username:{
    type:String,
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
    type: Number,
  },
  fixBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default:null,
  },
  //true: validated,false: no
  isValidate: {
    type: Boolean,
  },
  origin_transcript:{
    type:String,
  },
  bot_transcript:{
    type:String
  },
  final_transcript:{
    type:String,
  },
  duration:{
    type:String,
  },
  wer:{
    type:Number,
  },
  isLike:{
    type:Boolean,
  },
  upvote:[{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // default: [],
      },
    upVoteTime: {
      type: String,
    }
        },
  ],
  audio_name:{
    type:String,
  }

}, {timestamps: true});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = {Audio}
