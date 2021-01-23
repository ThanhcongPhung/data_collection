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
  let rooms = {};    // map socket.id => room
  let names = {};    // map socket.id => name
  let allUsers = {}; // map socket.id => socket
  let findPeer = function(socket) {
    if (queue.length === 0) {
      queue.push(socket)
    } else {
      let peer = queue.pop();
      let room = socket.id+"#"+peer.id;
      peer.join(room);
      socket.join(room);
      // register rooms to their names
      rooms[peer.id] = room;
      rooms[socket.id] = room;
      // exchange names between the two of them and start the chat
      peer.emit('chat start', {'name': names[socket.id], 'room':room,'role':1});
      socket.emit('chat start', {'name': names[peer.id], 'room':room,'role':2});
    }
  }
  // ^^^^^ server socket

  // vvvvv client socket
  io.on('connection', (socket) => {
    console.log("Connected: " + socket.id);

    socket.on('pushUserInfo', data => {
      console.log(data);
      names[socket.id] = data.userData.name;
      allUsers[socket.id] = socket;
      // let countdown = 5000;
      // let interval = setInterval(function() {
      //   countdown--;
      //   socket.emit('timer', { countdown: countdown });
      //   clearInterval(interval);
      // }, );
      findPeer(socket);
    });
    socket.on('leave room', function () {
      // let room = rooms[socket.id];
      // socket.broadcast.to(room).emit('chat end');
      // let peerID = room.split('#');
      // peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
      // // add both current and peer to the queue
      // findPeer(allUsers[peerID]);
      // findPeer(socket);
    });

    socket.on('disconnect', () => {
      // let room = rooms[socket.id];
      // socket.broadcast.to(room).emit('chat end');
      // let peerID = room.split('#');
      // peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
      // // current socket left, add the other one to the queue
      // findPeer(allUsers[peerID]);
      console.log("Disconnected: " + socket.id)
    });

    socket.on('joinRoom', ({ chatroomID, username }) => {
      socket.join(chatroomID);
      console.log(`The user ${username} has joined chatroom: ${chatroomID}`);
      // sending to individual socketid (private message)
      io.to(chatroomID).emit('joinRoom announce', {
        username: username,
      });
    });

    socket.on('leaveRoom', ({ chatroomID, username }) => {
      socket.leave(chatroomID);
      console.log(`The user ${username} has left chatroom: ${chatroomID}`)
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
  });
}

module.exports = sockets;