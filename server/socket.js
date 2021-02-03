const { text } = require('body-parser');

var sockets = {}
const { Message } = require("./models/Message");

sockets.init = function(server) {
  // socket.io setup
  const io = require('socket.io')(server, {cors: {origin: "http://localhost:3000"}});
  const jwt = require('jsonwebtoken');

  // socket logic go here
  io.use(async (socket, next) => {
    try {
      // Must be matched with the frontend.
      const token = socket.handshake.query.token;
      if (token !== "undefined") {
        await jwt.verify(token, 'secret', (err, decode) => {
          if (err) console.log(err)
          else {
            socket.userId = decode
            next()
          }
        });
      }
    } catch (err) {
      console.log(err)
    }
  })
  let audioQueue = [];    // ready for audio room
  let textQueue = [];     // ready for text room
  let promptQueue = [];   // ready to join room
  // ^^^^^ server socket

  // vvvvv client socket
  io.on('connection', (socket) => {
    console.log("Connected: " + socket.id);

    socket.on('disconnect', () => {
      console.log("Disconnected: " + socket.id)
    });

    // when receive ready signal from user
    socket.on('ready', ({ socketID, userID, username, inputType }) => {
      let userInfo = {
        socketID: socketID,
        userID: userID,
        username: username,
        inputType: inputType,
      }

      // put the user into the respective queue, "all" will put the user into both queues.
      if (inputType === "audio") {
        addToQueue(audioQueue, userInfo)
      } else if (inputType === "text") {
        addToQueue(textQueue, userInfo)
      } else {
        addToQueue(audioQueue, userInfo)
        addToQueue(textQueue, userInfo)
      }

      console.log(`At socket ${socketID} the user ${username} whose ID is ${userID} is ready to send ${inputType}`);

      // finding a partner
      let result = matching(audioQueue, textQueue, userInfo)

      // if found a matching partner
      if (result !== null) {
        console.log(`Client: ${result.client.username}, Servant: ${result.servant.username}, Room type: ${result.roomType}`)

        // result = { client: , servant: , roomType: , accepted: 0 }
        result.accepted = 0
        promptQueue.push(result)
        
        // send prompt to both users for confirm ready.
        io.to(result.client.socketID).emit('match', {
          client: result.client,
          servant: result.servant,
          roomType: result.roomType,
        })
        io.to(result.servant.socketID).emit('match', {
          client: result.client,
          servant: result.servant,
          roomType: result.roomType,
        })
      } 
    })

    // when both users confirm the second prompt, create a room and send them the information of the room.
    socket.on('confirm prompt', ({ socketID, userID, username, inputType }) => {
      let userInfo = {
        socketID: socketID,
        userID: userID,
        username: username,
        inputType: inputType,
      }

      let promptQueueIndex = checkExist(promptQueue, userInfo)
      if (promptQueueIndex !== -1) {
        let pair = promptQueue[promptQueueIndex]
        if (pair.accepted === 0) {
          pair.accepted++
          // tell one of the user that need the other user's prompt to continue.
          io.to(socketID).emit('wait for other prompt', ({}))
        } else {
          // create a room for two, send them id.
          createRoom(pair.client.userID, pair.servant.userID, pair.roomType)
          .then(roomID => {
            // tell both users that the room is ready
            io.to(pair.client.socketID).emit('prompt successful', ({
              roomID: roomID,
            }))
            io.to(pair.servant.socketID).emit('prompt successful', ({
              roomID: roomID,
            }))
          })
        }
      } else {
        // return error here!!! Need to handle error!!!
        console.log("Fail confirming prompt due to some shenanigan... can't find pair brrrrrrr");
      }
    })

    // when the user deny or miss the second ready prompt
    socket.on('cancel prompt', ({ socketID, userID, username, inputType }) => {
      let userInfo = {
        socketID: socketID,
        userID: userID,
        username: username,
        inputType: inputType,
      }

      let promptQueueIndex = checkExist(promptQueue, userInfo)
      if (promptQueueIndex !== -1) {
        let pair = promptQueue[promptQueueIndex]
        removeFromQueue(promptQueue, pair)

        // add the other user back to the HEAD of the queue
        let theOtherUser = pair.client.userID === userInfo.userID ? pair.client : pair.servant;
        if (theOtherUser.inputType === "audio") {
          addToQueue(audioQueue, userInfo)
        } else if (theOtherUser.inputType === "text") {
          addToQueue(textQueue, userInfo)
        } else {
          addToQueue(audioQueue, userInfo)
          addToQueue(textQueue, userInfo)
        }
        
        // tell that other user that the prompt has been cancelled and they are brought back to the queue.
        io.to(theOtherUser.socketID).emit('requeue', ({}))
      } else {
        // return error here!!! Need to handle error!!!
        console.log("Fail cancelling prompt due to some shenanigan... can't find pair brrrrrrr");
      }
    })

    // cancel ready status before the second confirmation (before "match" signal).
    socket.on('cancel ready', ({ userID, username }) => {
      removeFromQueue(audioQueue, userID);
      removeFromQueue(textQueue, userID);
      console.log(`The user ${username} whose ID is ${userID} has cancelled their ready status`);
    })

    socket.on('joinRoom', ({ chatroomID, username }) => {
      socket.join(chatroomID);
      console.log(`The user ${username} has joined chatroom: ${chatroomID}`);
    });

    socket.on('leaveRoom', ({ chatroomID, username }) => {
      socket.leave(chatroomID);
      console.log(`The user ${username} has left chatroom: ${chatroomID}`)
    });

    // Just receive a signal
    socket.on('chatroomAudio', ({ chatroomID, sender, link }) => {
      // sending to individual socketid (private message)
      io.to(chatroomID).emit('newAudioURL', {
        userID: socket.userId,
        sender: sender,
        audioLink: link,
      });
      console.log("Receive audio in chatroom " + chatroomID + " from " + sender + ". Here's the audio link: " +  link)
    });
    socket.on("Input Chat message", msg => {
      try {
        var message = new Message({ message: msg.chatMes, sender:msg.userId,intent: msg.intent });
        message.save(function (err,doc) {
          if(err) return console.error(doc)
          Message.find({"_id": doc._id})
              .populate("sender")
              .exec((err,doc)=>{
                return io.emit("Output Chat Message", doc);
              })
          console.log(doc)
        })
      } catch (error) {
        console.error(error);
      }


    });
  });
}

const addToQueue = (queue, userID) => {
  queue.push(userID)
}

const removeFromQueue = (queue, target) => {
  var index = queue.indexOf(target);
  if (index !== -1) {
    return queue.splice(index, 1);
  }
  return null;
}

const matching = (audioQueue, textQueue, userInfo) => {
  let matchingPartner;
  // check if there's someone in the queue
  if (audioQueue.length >= 2 && audioQueue.includes(userInfo)) {
    // if there's, create a room, then remove those two mofo out of the queue
    removeFromQueue(audioQueue, userInfo)
    removeFromQueue(textQueue, userInfo)
    
    matchingPartner = audioQueue.shift()
    removeFromQueue(textQueue, matchingPartner)

    // decide who's the client, who's the servant
    return {client: userInfo, servant: matchingPartner, roomType: "audio"}
  } else if (textQueue.length >= 2 && textQueue.includes(userInfo)) {
    // if there's, create a room, then remove those two mofo out of the queue
    removeFromQueue(audioQueue, userInfo)
    removeFromQueue(textQueue, userInfo)

    matchingPartner = textQueue.shift()
    removeFromQueue(audioQueue, matchingPartner)

    // decide who's the client, who's the servant
    return {client: userInfo, servant: matchingPartner, roomType: "text"}
  } else return null
}

const checkExist = (queue, userInfo) => {
  let result = -1
  queue.map((pair, index) => {
    if(compareObject(pair.client, userInfo) || compareObject(pair.servant, userInfo)) {
      result = index
      // PROBLEM!!! how to break from this (map) loop?
    } 
  })

  return result
}

const compareObject = (obj1, obj2) => {
  // This is the lazy way. 
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const { Chatroom } = require("./models/Chatroom");

const createRoom = async (userID1, userID2, roomType) => {
// user1 - client, user2 - servant
  let content_type = roomType === "audio" ? 0 : 1
  const randomValue = randomGenerator()

  const chatroom = await Chatroom.create({
    name: generateName() + randomValue,
    task: generateTask() + randomValue,
    content_type: content_type,
    user1: userID1,
    user2: userID2,
  })

  return chatroom._id
}

const randomGenerator = () => {
  return Math.floor(Math.random() * 1000);
}

const generateName = () => {
  // IMPLEMENT!!!
  return "A random room name "
}

const generateTask = () => {
  // IMPLEMENT!!!
  return "A sample task " 
}

module.exports = sockets;
