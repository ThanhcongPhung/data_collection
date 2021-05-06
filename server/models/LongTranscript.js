const mongoose = require('mongoose');

const longTranscriptSchema = new mongoose.Schema({
  audio_link: {
    type: String,
    unique:true,
  },
  transcript: {
    type: String,
    default: null,
  },
}, {timestamps: true});

const LongTranscript = mongoose.model('LongTranscript', longTranscriptSchema);
module.exports = { LongTranscript };