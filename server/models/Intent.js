const mongoose = require('mongoose');

const intentSchema = new mongoose.Schema({
  intent: {
    type: Number,
    default: null,
  },

  loan_purpose: {
    type: Number,
    default: null,
  },

  loan_type: {
    type: Number,
    default: null,
  },

  card_type: {
    type: Number,
    default: null,
  },

  card_usage: {
    type: Number,
    default: null,
  },

  digital_bank: {
    type: Number,
    default: null,
  },

  card_activation_type: {
    type: Number,
    default: null,
  },

  // need fix
  district: {
    // type: String,
    type: Number,
    default: null,
  },

  // need fix
  city: {
    // type: String,
    type: Number,
    default: null,
  },

  name: {
    type: String,
    default: null,
  },

  cmnd: {
    type: String,
    default: null,
  },

  four_last_digits: {
    type: String,
    default: null,
  },

  generic_intent: {
    type: Number,
    default: null,
  },
  risk_report:{
    type:Number,
    default:null,
  }
});

const Intent = mongoose.model('Intent', intentSchema);
module.exports = { Intent };