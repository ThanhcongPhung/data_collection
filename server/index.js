const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const fs = require('fs');
const mongoose = require("mongoose");
const multer = require('multer');
const axios = require('axios')
const https = require('https')

app.use(express.json());
app.use(cors());

const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Importing AWSPresigner
const {
  generateGetUrl,
  generatePutUrl
} = require('./AWSPresigner');

app.get('/generate-get-url', (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  const { Key } = req.query;
  generateGetUrl(Key)
      .then(getURL => {
        res.send(getURL);
      })
      .catch(err => {
        res.send(err);
      });
});

// PUT URL
app.get('/generate-put-url', (req,res)=>{
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } =  req.query;
  console.log(req.query)
  generatePutUrl(Key, ContentType).then(putURL => {
    console.log(putURL)
    res.send({putURL,Key});
  })
      .catch(err => {
        res.send(err);
      });
});

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`)
//   },
// })


// var upload = multer({storage: storage}).single("file")
app.post("/api/uploadfiles", (req, res) => {
  console.log("data from client: "+ req.body);
})



// var file= fs.createWriteStream('s3://data-collection-20202')
// var data = s3.getObject(params).createReadStream().pipe(file);
// const options={
//   headers:{
//     'api-key': 'azjQBAy8CcTBAiRUn82D6KcG2BlonQfu'
//   }
// }
// axios.post(url,data,options)
//     .then(response=>{
//       console.log(response.data)
//     })
// upload(req, res, err => {
//   if(err) {
//     return res.json({ success: false, err })
//   }
//   return res.json({ success: true, url: res.req.file.path });
// })
// });



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
app.use('/api/message', require('./routes/message'));
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
