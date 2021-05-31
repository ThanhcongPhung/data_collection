const mongoose = require('mongoose');

const validateRoomSchema = new mongoose.Schema({
  name: {
    type:String,
    default: "",
    unique:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default:null
  },
  audioList:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Audio',
    default: [],
  }],
  //0:no ones joint,1:validating,2:complete
  status:{
    type:Number,
    default:0,
  },
  validatedAudio:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Audio',
    default: [],
  }],
},{timestamps: true})


const ValidateRoom = mongoose.model('ValidateRoom', validateRoomSchema);

module.exports = { ValidateRoom }
