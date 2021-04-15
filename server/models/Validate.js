const mongoose = require('mongoose');

const validateSchema = new mongoose.Schema({
  // user1 gives command
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  up_vote: [{
    audio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audio',
    },
    up_vote_time: {
      type: String,
    }
  },
  ],
  down_vote: [{
    audio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audio',
    },
    down_vote_time: {
      type: String,
    },
    new_transcript: {
      type: String,
    }
  },
  ],
});

const Validate = mongoose.model('Validate', validateSchema);
module.exports = {Validate};