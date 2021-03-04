const express = require('express');
const router = express.Router();
const tmp = require('tmp')
const request = require('request')
const fs = require('fs');

let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

router.post('/',(req,res)=>{
  console.log(req.body.link)
  const spawn = require("child_process").spawn;

  tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
    if (err) throw err;

    download(req.body.link, path , function(){
      console.log('done');
    });
    console.log('File: ', path);
    console.log('File descriptor: ', fd);

    let process = spawn('python',["./sample_asr_python_grpc/main.py",path] );

    process.stdout.on('data', function(data) {
      res.send(data.toString());
    } )

    cleanupCallback();
  });
})


module.exports = router;