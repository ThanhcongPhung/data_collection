const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./configs/key");
const mongoose = require("mongoose");
const session = require('express-session');
const Redis = require('ioredis');
const connectRedis= require('connect-redis')
const RedisStore = connectRedis(session)



app.use(express.json());
app.use(cors());

mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
const client = new Redis({
  port:6379,
  host:'localhost',
})

app.use(session({
  store: new RedisStore({client:client}),
  secret:'mySecret',
  saveUninitialized:false,
  resave:false,
  cookie: { secure: false,httpOnly:true, maxAge: 24 * 60 * 60 * 1000 }
}))



//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: "9d5067a5a36f2bd6f5e93008865536c7",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}))
app.use('/api/users', require('./routes/users'));
app.use('/api/chatroom', require("./routes/chatroom"));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/message', require('./routes/message'));
app.use('/api/audio', require('./routes/audio'));
app.use('/api/getText', require('./routes/getText'));
app.use('/api/sso', require('./routes/merge'));
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

app.use(express.static(__dirname))

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

var sockets = require('./socket')
sockets.init(server)

// Generate Room ID
// function uuidv4() {
//   return mongoose.Types.ObjectId();
// }
