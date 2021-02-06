const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const AWS= require('aws-sdk');
const config = require("./config/key");
const fs = require('fs');
const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const ID='ASIA5H5AVHPSSIISKK6P';
const SECRET = 'r96ZQyAZqf/2dIuDRvW6n/iZm7G3AiaFhXOYKjrF';
const SESSION = 'FwoGZXIvYXdzEEoaDDih5VuY7RenJ3mCkSLMAdPrCpXreIQ9I2UuES2YkXnrQIqJvdxxCBpPYp4az/i/yMflbb/hEyccgVchRueJvnw1RTiBIfdPKqoKCtRfdaeQW28SODjbxf4NRIKmsxc3UqlIGZWZfAfijRpFoGHWTpUfl4pEw53uQU92BpV1vMYsCJPv1KUEwd/+b0Jlx9yOxv7d335ssXXYgfND4tJTYaZj6VF2SNaEB4drg87NXEOHqH73BhPtBnZfs/paaM2ZKB/L0IDJhjF4YYfEYYQA5dnWVQaQMkoaj1wTGyi47PWABjItd2uGN5kYq7DoE5rVvUQ5fOz6BkhE7Xr7f7rxlBjoaLs9fvy/g3KEazyYV3Qx'
const BUCKET_NAME = 'data-collection-20202';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  sessionToken: SESSION
})
// const params = {
//   Bucket: BUCKET_NAME,
//   CreateBucketConfiguration: {
//     // Set your region here
//     LocationConstraint: "eu-west-1"
//   }
// };

// s3.createBucket(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log('Bucket Created Successfully', data.Location);
// });
const fileName= 'server/public/audio/2021/02/01/1kbtFDkDQexTnGw6.wav'
const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'cat.wav', // File name you want to save as in S3
    Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};
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
