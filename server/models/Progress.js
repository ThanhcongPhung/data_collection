const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  action: {
    type: Number,
    default: -1,
    required: "Action progress is required",
  },

  device: {
    type: Number,
    default: -1,
    required: "Device progress is required",
  },

  floor: {
    type: Number,
    default: -1,
    required: "Floor progress is required",
  },

  room: {
    type: Number,
    default: -1,
    required: "Room progress is required",
  },

  scale: {
    type: Number,
    default: -1,
    required: "Scale progress is required",
  },

  level: {
    type: Number,
    default: -1,
    required: "Level progress is required",
  },
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = { Progress };