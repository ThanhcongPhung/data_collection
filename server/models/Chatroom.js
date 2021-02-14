const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  name: {
    type:String,
    maxlength:50,
    default: 'An unnamed room',
  },
  task: {
    type:String,
    maxlength:50
  },
  // user1 gives command
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      
  },
  // user2 receive command and shoot back response.
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      
  },
  // content_type decides the input type that users will provide 0 - audio, 1 - message
  content_type: {
    type: Number,
    default: 0,
    min: 0,
    max: 1,
  },
  audioList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audio',
    default: [],
  }],
  intent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Intent',
    required: 'Intent ID is required',
  },
  // progress shows which criteria has been done. 
  // -1 - non-exist, 0 - not done, 1 - done
  progress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Progress',
    required: 'Progress ID is required',
  },
  // 1 - client - 2 - servant send intent - 3 - servant send audio
  turn: {
    type: Number,
    min: 1,
    max: 3,
    default: 1,
    required: "Need to decide whose turn of this room is",
  }
})

// update room's intent and progress
// messageSchema.statics.updateAudio = 


const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = { Chatroom }
