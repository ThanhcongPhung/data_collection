const mongoose = require('mongoose');

const intentSchema = new mongoose.Schema({
  action: {
    type: String,
  },

  device: {
    type: String,
  },

  floor: {
    type: Number,
  },

  room: {
    type: String,
  },

  scale: {
    type: String,
  },

  level: {
    type: Number,
  },
});

const Intent = mongoose.model('Intent', intentSchema);
module.exports = { Intent };