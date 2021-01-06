const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


require("./models/Message")

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/chatroom', require("./routes/chatroom"));
app.use('/api/upload', require('./routes/upload'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

app.use(express.static('./public'))

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});

const io = require('socket.io')(server, { cors: { origin: "http://localhost:3000" } });
const jwt = require('jsonwebtoken');

io.use(async (socket, next) => {
  try {
    // Must be matched with the frontend.
    const token = socket.handshake.query.token;
    if(token !== "undefined") {
      await jwt.verify(token,'secret', (err, decode) => {
        if(err) console.log(err)
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
// ^^^^^ server socket
let sockets = {};
// vvvvv client socket
io.on('connection', (socket) => {
  console.log("Connected: " + socket.userId);
  socket.emit('connection', {"id": socket.id});

  socket.on('getUserInfo', data => {
    // console.log(data);
    sockets[socket.id] = {
      username: data.userData.name,
      email: data.userData.email,
      is_joint: false,
      room_id: null
    };

  });
  console.log(sockets);
  socket.on('getOpponents', data => {
    let response = [];
    for (let id in sockets) {
      if (id !== socket.id && !sockets[id].is_joint) {
        response.push({
          id: id,
          name: sockets[id].name,
          email: sockets[id].email,
        })
      }
    }
  });
  socket.on('startConversation', data => {
    let roomId = uuidv4();
  })

  socket.on('disconnect', () => {
    console.log("Disconnected: " + socket.userId)
  });

  socket.on('joinRoom', ({ chatroomID, username }) => {
      socket.join(chatroomID);
      console.log(`The user ${username} has joined chatroom: ${chatroomID}`)
  });

  socket.on('leaveRoom', ({ chatroomID, username }) => {
    socket.leave(chatroomID);
    console.log(`The user ${username} has left chatroom: ${chatroomID}`)
    
  });

  // Just receive a signal
  socket.on('chatroomAudio', ({ chatroomID, sender }) => {
    io.to(chatroomID).emit('newAudioURL', {
      userID: socket.userId,
      sender: sender
    });
    console.log("Receive audio in chatroom " + chatroomID + " from " + sender)
  });
});

// Generate Room ID
function uuidv4() {
  return mongoose.Types.ObjectId();
}
