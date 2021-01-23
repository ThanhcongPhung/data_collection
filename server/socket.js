var sockets = {}

sockets.init = function(server) {
  // socket.io setup
  const io = require('socket.io')(server, {cors: {origin: "http://localhost:3000"}});

  // socket logic go here
}

module.exports = sockets;