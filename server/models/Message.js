const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  // Sẽ upload lên màn hình của chatroom qua socket nên có khi không cần cái này nữa
  // chatroom: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: "Chatroom is required",
  //   ref: 'Chatroom',
  // },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      
  },

  message: {
    type: String,
    required: "Message is required",
  }, 
})


const Message = mongoose.model('Message', messageSchema);

module.exports = { Message }
