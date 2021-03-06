const sockets = {}
const { User } = require("./models/User");
const {Message} = require("./models/Message");
const { Intent } = require("./models/Intent");

sockets.init = function (server) {
  // socket.io setup
  const io = require('socket.io')(server, {
    // path: '/socket',
  });
  const jwt = require('jsonwebtoken');

  // socket logic go here
  io.use(async (socket, next) => {
    try {
      // Must be matched with the frontend.
      const token = socket.handshake.query.token;
      // console.log(token)
      // if (token !== "undefined") {
      if (token !== "undefined" && token !== "null" && token !== "") {
        // await jwt.verify(token, 'secret', (err, decode) => {
        await jwt.verify(token, '9d5067a5a36f2bd6f5e93008865536c7', (err, decode) => {
          if (err) console.log(err)
          else {
            const ssoUserId = decode.ssoUserId;
            User.findOne({ ssoUserId: ssoUserId })
                .then(userFound => {
                  socket.userId = userFound._id;
                  next()
                })
            // socket.userId = decode
            // next()
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
      let index = audioQueue.findIndex(item => item.socketID === socket.id)
      if (index !== -1) {
        audioQueue.splice(index, 1);
      } else {
        index = textQueue.findIndex(item => item.socketID === socket.id)
        if (index != -1) {
          textQueue.splice(index, 1);
        }
      }
    });

    // when receive ready signal from user
    socket.on('ready', ({socketID, userID, username, inputType}) => {
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
        // console.log(`Client: ${result.client.username}, Servant: ${result.servant.username}, Room type: ${result.roomType}`)

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
    socket.on('confirm prompt', ({socketID, userID, username, inputType}) => {
      let userInfo = {
        socketID: socketID,
        userID: userID,
        username: username,
        inputType: inputType,
      }
      // console.log(userInfo)
      // console.log(promptQueue)
      let promptQueueIndex = checkExist(promptQueue, userInfo)
      // console.log(promptQueueIndex)
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
    socket.on('cancel prompt', ({socketID, userID, username, inputType}) => {
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
    socket.on('cancel ready', ({socketID, userID, username, inputType}) => {
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

    socket.on('joinRoom', ({chatroomID, username}) => {
      socket.join(chatroomID);
      console.log(`The user ${username} has joined chatroom: ${chatroomID}`);
      io.to(chatroomID).emit('joinRoom announce', {
        username: username,
      });
    });
    socket.on("Recording", ({ roomID,username }) => {
      io.to(roomID).emit("user recording", {username});
    })

    socket.on("Done Recording", ({ roomID ,username}) => {
      io.to(roomID).emit("user done recording", {username});
    })
    socket.on("Get transcript", ({ roomID, username }) => {
      io.to(roomID).emit("getting transcript", {username});
    })
    socket.on("Re record", ({ chatroomID, username }) => {
      // console.log("rerecording")
      io.to(chatroomID).emit("repeat", {username});
    })
    socket.on('leaveRoom', ({chatroomID, username}) => {
      socket.leave(chatroomID);
      console.log(`The user ${username} has left chatroom: ${chatroomID}`)
      io.to(chatroomID).emit('leaveRoom announce', {
        username: username,
      });
    });

    // Just receive a signal
    socket.on('chatroomAudio', ({chatroomID, sender, ava,link,transcript,audioID,userID}) => {
      // sending to individual socketid (private message)
      io.to(chatroomID).emit('newAudioURL', {
        userID: socket.userId,
        sender: sender,
        ava: ava,
        audioLink: link,
        transcript:transcript,
        audioID:audioID
      });
      console.log("Receive audio in chatroom " + chatroomID + " from " + sender + ". Here's the audio link: " + link)
    });
    socket.on("Input Chat message", msg => {
      try {
        var message = new Message({
          message: msg.chatMes,
          sender: msg.userId,
          intent: msg.intent,
          chatroomID: msg.chatroomID
        });
        message.save(function (err, doc) {
          if (err) return console.error(doc)
          Message.find({"_id": doc._id})
              .populate("sender")
              .exec((err, doc) => {
                return io.emit("Output Chat Message", doc);
              })
          console.log(doc)
        })
      } catch (error) {
        console.error(error);
      }


    });
    socket.on('update transcript',({chatroomID,sender,newTranscript,audioIndex})=>{
      io.to(chatroomID).emit("change transcript",{
        username: sender,
        transcript: newTranscript,
        index: audioIndex,
      })
    });
    socket.on('update like state',({chatroomID,sender,newIsLikeState,audioIndex})=>{
      io.to(chatroomID).emit("change like state",{
        username: sender,
        isLike: newIsLikeState,
        index: audioIndex,
      })
    })
  });
}

const addToQueue = (queue, userInfo) => {
  let count = 0;
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].userID === userInfo.userID) {
      count++;
      break;
    }
  }

  if (count === 0) queue.push(userInfo);
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
    if (compareObject(pair.client, userInfo) || compareObject(pair.servant, userInfo)) {
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

const {Chatroom} = require("./models/Chatroom");

const createRoom = async (userID1, userID2, roomType) => {
// user1 - client, user2 - servant
  let content_type = roomType === "audio" ? 0 : 1
  let intent = await createRandomScenario()
  const name = await generateName(intent.intent)+`_${Date.now()}`;
  // const randomValue = randomGenerator()

  const chatroom = await Chatroom.create({
    name: name,
    task: generateTask(intent.intent),
    content_type: content_type,
    user1: userID1,
    user2: userID2,
    intent: intent._id,
  })
      .catch(async err => {
        if (err.name === "MongoError") {
          if (err.code === 11000) {
            return await Chatroom.create({
              name: await generateName(intent.intent)+`_${Date.now()}`,
              task: generateTask(intent.intent),
              content_type: content_type,
              user1: userID1,
              user2: userID2,
              intent: intent._id,
            })
          }
        } else {
          console.log(err);
          return null;
        }
      });

  return chatroom._id
}

const intentSamplePool = require("./configs/intent");
const createRandomScenario = () => {
  // gen base intent
  const intentIndex = getRandomFromArray(intentSamplePool.INTENT);
  // const intentIndex = 16;
  const slots = intentSamplePool.INTENT[intentIndex].slot;

  let tempIntent = {
    intent: intentIndex,
  }

  // gen slot required for intent.
  slots.map(slot => {
    if (intentSamplePool[slot.toUpperCase()] === undefined) {
      // Have to change it once we know how to handle the city and district.
      return tempIntent[slot] = -1;
    }
    const slotPool = intentSamplePool[slot.toUpperCase()];
    // we decide the objective.
    // if (slot === "district") {
    //   // console.log
    //   const slotIndex = getRandomFromArray(slotPool[intentSamplePool.CITY[tempIntent["city"]]]);
    //   return tempIntent[slot] = slotIndex;
    // }
    // let users decide the object.
    if (slot === "city" || slot === "district") {
      return tempIntent[slot] = -1;
    }
    const slotIndex = getRandomFromArray(slotPool);
    return tempIntent[slot] = slotIndex;
  })

  const { intent, loan_purpose, loan_type, card_type, card_usage, digital_bank, card_activation_type, district, city, name, cmnd, four_last_digits,risk_report } = tempIntent;
  // I can still put this lil piece of crap in the {} up there, but who knows what magic it might hold, so better safe than sorry.
  const generic_intent = null;
  return Intent.create({
    intent, loan_purpose, loan_type, card_type, card_usage, digital_bank, card_activation_type, district, city, name, cmnd, four_last_digits, generic_intent,risk_report
  })
}
const createRandomIntent = () => {
  // gen base intent
  const intentIndex = getRandomFromArray(intentSamplePool.INTENT);
  // const intentIndex = 12;
  const slots = intentSamplePool.INTENT[intentIndex].slot;

  let tempIntent = {
    intent: intentIndex,
  }

  // gen slot required for intent.
  slots.map(slot => {
    if (intentSamplePool[slot.toUpperCase()] === undefined) {
      // Have to change it once we know how to handle the city and district.
      return tempIntent[slot] = -1;
    }
    const slotPool = intentSamplePool[slot.toUpperCase()];
    // we decide the objective.
    // if (slot === "district") {
    //   // console.log
    //   const slotIndex = getRandomFromArray(slotPool[intentSamplePool.CITY[tempIntent["city"]]]);
    //   return tempIntent[slot] = slotIndex;
    // }
    // let users decide the object.
    if (slot === "city" || slot === "district") {
      return tempIntent[slot] = -1;
    }
    const slotIndex = getRandomFromArray(slotPool);
    return tempIntent[slot] = slotIndex;
  })

  const { intent, loan_purpose, loan_type, card_type, card_usage, digital_bank, card_activation_type, district, city, name, cmnd, four_last_digits } = tempIntent;
  // I can still put this lil piece of crap in the {} up there, but who knows what magic it might hold, so better safe than sorry.
  const generic_intent = null;
  return Intent.create({
    intent, loan_purpose, loan_type, card_type, card_usage, digital_bank, card_activation_type, district, city, name, cmnd, four_last_digits, generic_intent
  })
}

// transfer information from newObject to the originalObject
const transferObject = (originalObject, newObject) => {
  for (let key in newObject) {
    if (newObject.hasOwnProperty(key)) {
      originalObject[key] = newObject[key];
    }
  }

  return originalObject;
}

const getRandomFromArray = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

const randomGenerator = () => {
  return Math.floor(Math.random() * 1000);
}

const generateName = (index) => {
  return intentSamplePool.INTENT[index].name;
}

const generateTask = (index) => {

  return intentSamplePool.INTENT[index].name;
}

module.exports = sockets;
