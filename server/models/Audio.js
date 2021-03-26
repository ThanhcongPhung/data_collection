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
    // required: true,
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
  }
}, {timestamps: true});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = {Audio}
