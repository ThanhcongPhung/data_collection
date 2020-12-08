const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

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
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/chatroom', require("./routes/chatroom"));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

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
    await jwt.verify(token,'secret', (err, decode) => {
      if(err) console.log(err)
      else {
        socket.userId = decode
        next()
      }
    });
  } catch (err) {
    console.log(err)
  }
})
// ^^^^^ server socket

// vvvvv client socket
io.on('connection', (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on('disconnect', () => {
    console.log("Disconnected: " + socket.userId)
  });
})