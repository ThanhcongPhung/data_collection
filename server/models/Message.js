const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  // Sẽ upload lên màn hình của chatroom qua socket nên có khi không cần cái này nữa
  // chatroom: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: "Chatroom is required",
  //   ref: 'Chatroom',
  // },
  message: {
    type: String,
    required: "Message is required",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  chatroomID:{
    type:String,
  },
  intent:{
    type: [String],
  },
},{timestamps:true});


const Message = mongoose.model('Message', messageSchema);

module.exports = { Message }