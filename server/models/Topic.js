const mongoose = require('mongoose');


const topicSchema = new mongoose.Schema({

  name: {
    type: String,
    required: "Message is required",
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  domainID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain',
    default:null,
  },
  client:{
    type:String,
    default:null,
  },
  servant:{
    type:String,
    default:null,
  }
},{timestamps:true});


const Topic = mongoose.model('Topic', topicSchema);

module.exports = { Topic }
