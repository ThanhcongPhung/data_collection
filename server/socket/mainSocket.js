var sockets = {}
const { Message } = require("./../models/Message");

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
      var index = audioQueue.findIndex(item => item.socketID === socket.id)
      if (index !== -1) {
        audioQueue.splice(index, 1);
      } else {
        index = textQueue.findIndex(item => item.socketID === socket.id)
        if (index !== -1) {
          textQueue.splice(index, 1);
        }
      }
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

      // check if the pair exists in the prompt queue
      let promptQueueIndex = checkExist(promptQueue, userInfo)
      if (promptQueueIndex !== -1) {
        // remove those two mofo off the prompt queue
        let pair = promptQueue[promptQueueIndex]
        removeFromQueue(promptQueue, pair)

        // add the other user back to the HEAD of the queue
        let theOtherUser = pair.client.userID === userInfo.userID ? pair.servant : pair.client;
        if (theOtherUser.inputType === "audio") {
          addToQueue(audioQueue, theOtherUser)
        } else if (theOtherUser.inputType === "text") {
          addToQueue(textQueue, theOtherUser)
        } else {
          addToQueue(audioQueue, theOtherUser)
          addToQueue(textQueue, theOtherUser)
        }
        
        io.to(theOtherUser.socketID).emit('requeue', ({}))
      } else {
        // return error here!!! Need to handle error!!!
        console.log("Fail cancelling prompt due to some shenanigan... can't find pair brrrrrrr");
      }
    })

    // cancel ready status before the second confirmation (before "match" signal).
    socket.on('cancel ready', ({ socketID, userID, username, inputType }) => {
      let userInfo = {
        socketID: socketID,
        userID: userID,
        username: username,
        inputType: inputType,
      }
      removeFromQueue(audioQueue, userInfo);
      removeFromQueue(textQueue, userInfo);
      console.log(`The user ${username} whose ID is ${userID} has cancelled their ready status`);
    })

    // when an user enters the room, announce to everyone else in the room
    socket.on('joinRoom', ({ chatroomID, username }) => {
      socket.join(chatroomID);
      console.log(`The user ${username} has joined chatroom: ${chatroomID}`);
      
      // sending to individual socketid (private message)	
      io.to(chatroomID).emit('joinRoom announce', {	
        username: username,	
      });
    });

    // when an user leaves the room, announce to everyone else in the room
    socket.on('leaveRoom', ({ chatroomID, username }) => {
      socket.leave(chatroomID);
      console.log(`The user ${username} has left chatroom: ${chatroomID}`)

      // sending to individual socketid (private message)
      io.to(chatroomID).emit('leaveRoom announce', {	
        username: username,	
      });
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

    // when receive a message
    socket.on("Input Chat message", msg => {
      try {
        var message = new Message({ message: msg.chatMes, sender:msg.userId,intent: msg.intent, chatroomID:msg.chatroomID });
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

  // Just receive an intent. This should be seperate for servant and together with an audio for client.

  // Compare the receive signal.

  // If right, send one signal to the servant to congrat and one to the client telling them that the servant has understood and now recording. 
  // Then save the intent to the progress record

  // If different, send one signal to the servant telling them that they are wrong, telling them to ask the client what's going on
  // The intent that the client sent won't be saved in the progress record. 

  // Need to add a "I don't understand button, please say the line again" for both side. None of them can delete their own audios unless the other party does so.
  // If the button is pressed, the last message that was sent out of the room will be deleted. (Of course, can't always press it). 
  // This gonna be a problem since I have to update code for both amazon server and local server. Or I can cheat just by deleting the record of the room. 
  // But since the policy of the website is that once the conversation is over, the room will be destroy along with its record... Maybe I should create a log for that.
  // Create a log for the record so deleting audio won't be a problem.
  // Also create a log for those deleted record. So can pluck em out and put them into a trash folder
}

const addToQueue = (queue, userID) => {
  queue.push(userID)
}

const removeFromQueue = (queue, target) => {
  // var index = queue.indexOf(target);
  var index = queue.findIndex(item => compareObject(item, target))
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

const { Chatroom } = require("./../models/Chatroom");

const createRoom = async (userID1, userID2, roomType) => {
  // user1 - client, user2 - servant
  let content_type = roomType === "audio" ? 0 : 1
  const randomValue = randomGenerator()

  let intent = await createRandomIntent()
  let progress = await createRandomProgress(
    intent.action, 
    intent.device, 
    intent.floor,
    intent.room,
    intent.scale,
    intent.level,
  )
  const chatroom = await Chatroom.create({
    name: generateName() + randomValue,
    task: generateTask(intent.action, intent.device),
    content_type: content_type,
    user1: userID1,
    user2: userID2,
    intent: intent._id,
    progress: progress._id,
  })

  return chatroom._id
}

const randomGenerator = () => {
  return Math.floor(Math.random() * 1000);
}

const generateName = () => {
  // IMPLEMENT!!!
  return "Room R"
}

const generateTask = (action, device) => {
  return `${action} ${device.toLowerCase()}`
}

const { Intent } = require("./../models/Intent");
const { DEVICE } = require("./../config/intent");
// const { DEVICE, COLOR } = require("./../config/intent");

const createRandomIntent = () => {
  // gen device
  let target = getRandomFromArray(DEVICE);
  let device = target.name 
  // gen floor
  let floor = Math.floor(Math.random()*3 + 1);
  // gen room
  let room = getRandomFromArray(target.room);
  // gen action
  let targetAction = getRandomFromArray(target.action);
  let action = targetAction.name;
  // gen scale and level
  let targetScale = null;
  let scale = null;
  let level = null;
  if (targetAction.scale != null) {
    if (targetAction.requireScale === 1 || Math.floor(Math.random() * 2) === 1) {
      targetScale = getRandomFromArray(targetAction.scale);
    } 
  }
  if (targetScale != null) {
    scale = targetScale.name;
    // Can't deal with this yet... Hardcode on frontend side for now.
    // if (scale === 'Màu') {
    //   level = COLOR[Math.floor(Math.random() * 2)];
    // } else {
    level = genRandomInt(targetScale.min, targetScale.max);
    // }
  }

  const intent = Intent.create({
    action: action,
    device: device,
    floor: floor,
    room: room,
    scale: scale,
    level: level,
  })

  return intent
}

const { Progress } = require("./../models/Progress")

const createRandomProgress = (action, device, floor, room, scale, level) => {
  const progress = Progress.create({
    action: (action === null ? -1 : 0),
    device: (device === null ? -1 : 0),
    floor: (floor === null ? -1 : 0),
    room: (room === null ? -1 : 0),
    scale: (scale === null ? -1 : 0),
    level: (level === null ? -1 : 0),
  })

  return progress
}

const getRandomFromArray = (arr) => {
  var item = arr[Math.floor(Math.random() * arr.length)]
  return item
}

const genRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = sockets;
