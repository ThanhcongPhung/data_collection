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
  let queue = [];    // list of sockets waiting for peers

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
      addToQueue(queue, userID)
      console.log(`The user ${username} whose ID is ${userID} is ready to send ${inputType}`);
    })

    socket.on('cancel ready', ({userID, username}) => {
      removeFromQueue(queue, userID)
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
  queue = queue.filter((id) => {
    return id !== userID
  })
}

module.exports = sockets;