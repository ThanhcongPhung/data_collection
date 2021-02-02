const { text } = require('body-parser');

var sockets = {}

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
  let audioQueue = [];
  let textQueue = [];

  // let rooms = {};    // map socket.id => room
  // let names = {};    // map socket.id => name
  // let allUsers = {}; // map socket.id => socket
  // let findPeer = function(socket) {
  //   if (queue.length === 0) {
  //     queue.push(socket)
  //   } else {
  //     let peer = queue.pop();
  //     let room = socket.id+"#"+peer.id;
  //     peer.join(room);
  //     socket.join(room);
  //     // register rooms to their names
  //     rooms[peer.id] = room;
  //     rooms[socket.id] = room;
  //     // exchange names between the two of them and start the chat
  //     peer.emit('chat start', {'name': names[socket.id], 'room':room,'role':1});
  //     socket.emit('chat start', {'name': names[peer.id], 'room':room,'role':2});
  //   }
  // }
  // ^^^^^ server socket

  // vvvvv client socket
  io.on('connection', (socket) => {
    console.log("Connected: " + socket.id);

    socket.on('disconnect', () => {
      console.log("Disconnected: " + socket.id)
    });

    socket.on('ready', ({userID, username, inputType}) => {
      if (inputType === "audio") {
        addToQueue(audioQueue, userID)
      } else if (inputType === "text") {
        addToQueue(textQueue, userID)
      } else {
        addToQueue(audioQueue, userID)
        addToQueue(textQueue, userID)
      }

      console.log(`The user ${username} whose ID is ${userID} is ready to send ${inputType}`);
      let result = matching(audioQueue, textQueue ,userID)
      if (result !== null) {
        console.log(`Client: ${result.client}, Servant: ${result.servant}, Room type: ${result.roomType}`)
        
        // send prompt for confirm ready.
        socket.emit('match', {
          client: result.client,
          servant: result.servant,
          roomType: result.roomType,
        })
      } 
    })

    // socket.on('ready 2', ())

    socket.on('cancel ready', ({userID, username}) => {
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
  });
}

const addToQueue = (queue, userID) => {
  queue.push(userID)
}

const removeFromQueue = (queue, userID) => {
  var index = queue.indexOf(userID);
  if (index !== -1) {
    queue.splice(index, 1);
  }
  return queue;
}

const matching = (audioQueue, textQueue, userID) => {
  let matchingPartner;
  // check if there's someone in the queue
  if (audioQueue.length >= 2 && audioQueue.includes(userID)) {
    // if there's, create a room, then remove those two mofo out of the queue
    removeFromQueue(audioQueue, userID)
    removeFromQueue(textQueue, userID)
    
    matchingPartner = audioQueue.shift()
    removeFromQueue(textQueue, matchingPartner)

    // decide who's the client, who's the servant
    return {client: userID, servant: matchingPartner, roomType: "audio"}
  } else if (textQueue.length >= 2 && textQueue.includes(userID)) {
    // if there's, create a room, then remove those two mofo out of the queue
    removeFromQueue(audioQueue, userID)
    removeFromQueue(textQueue, userID)

    matchingPartner = textQueue.shift()
    removeFromQueue(audioQueue, matchingPartner)

    // decide who's the client, who's the servant
    return {client: userID, servant: matchingPartner, roomType: "text"}
  } else return null
}

const { Chatroom } = require("./models/Chatroom");

// const createRoom = (userID1, userID2, roomType) => {
// user1 - client, user2 - servant
const createRoom = (roomType) => {
  let content_type = roomType === "audio" ? 0 : 1
  const randomValue = randomGenerator()
  const chatroom = new Chatroom({
    name: generateName() + randomValue,
    task: generateTask() + randomValue,
    content_type: content_type,
    // user1: userID1,
    // user2: userID2,
  })

  chatroom.save((err, roomCreated) => {
    if (err) {
      console.log("CAN'T CREATE AUDIO ROOM!" + err );
      return null
    }
    console.log(`Room created. Room info: ${roomCreated}`)
    return roomCreated._id
  })
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