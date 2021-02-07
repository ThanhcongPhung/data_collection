const mongoose = require('mongoose');

const intentSchema = new mongoose.Schema({
  action: {
    type: String,
    required: "Action is required", // cai nay co require khong nhi :/ Kieu "Tang 1 phong an" thi cha co action nao ca
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