const mongoose = require('mongoose');


const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
},{timestamps:true});


const Domain = mongoose.model('Domain', domainSchema);

module.exports = { Domain }
