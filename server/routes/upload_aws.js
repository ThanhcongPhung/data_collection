// const fs = require('fs');


const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const { awsAccessKeyId, awsSecretAccessKey, awsSessionToken, awsBucketName, awsRegion } = require('./../config/aws');
const mongoose = require("mongoose");

// Generate random ID
function uuidv4() {
  return mongoose.Types.ObjectId();
}

AWS.config.update({region: awsRegion});

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    sessionToken: awsSessionToken,
  }
})

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '')
  }
})

const upload = multer({ storage }).single('soundBlob')

router.post('/', upload, (req, res) => {

  let myFile = req.file.originalname.split(".")
  const fileType = myFile[myFile.length - 1]
  
  const params = {
    Bucket: awsBucketName, 
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer,
  }

  s3.upload(params, (err, data) => {
    if (err) throw err
    console.log(`File uploaded successfully at ${data.Location}`)

    res.status(200).send(data)
  })
})

module.exports = router;