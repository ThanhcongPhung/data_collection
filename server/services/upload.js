const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { request } = require('express');
// const request = require('request');
// const FileType = require('file-type');

const DESTINATION = 'public';
const AUDIO_FOLDER = 'audio';
const FAIL_FOLDER = 'trash';
const OTHER_FOLDER = 'others';

const filetypes = /jpeg|jpg|png|gif|mp3|wma|wav|audio\/vnd.wave|acc|m4a|flac|mp4|mpg|mpeg|mov|wmv|flv|f4v|plain|pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.ms-powerpoint|vnd.openxmlformats-officedocument.presentationml.presentation|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet/;
const fileExts = /mp3|wma|wav|acc|m4a|flac|mp4/;

const storage = multer.diskStorage({
  // cb ~ callback
  destination: (req, file, cb) => {
    let destination;

    const customDestination = req.body.destination;
    if (customDestination) {
      destination = `${DESTINATION}/${customDestination}`;
    } else {
      const today = new Date();
      const year = today.getFullYear();
      const month =
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1;
      const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();

      destination = `${DESTINATION}/${OTHER_FOLDER}/${year}/${month}/${day}`;

      if (/audio/.test(file.mimetype)) {
        destination = `${DESTINATION}/${AUDIO_FOLDER}/${year}/${month}/${day}`;
      } else {
        destination = `${DESTINATION}/${FAIL_FOLDER}/${year}/${month}/${day}`;
      }
    }

    mkDirByPathSync(destination);
    return cb(null, path.join(__dirname, '../', destination))
  },
  filename: (req, file, cb) => {
    const filename = `${generateRandomString(16)}${path.extname(
      file.originalname,
    )}`;
    return cb(null, filename)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimetype = filetypes.test(file.mimetype);
    const extname = fileExts.test(
      path.extname(file.originalname).toLowerCase(),
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error(`File upload only support the following filetypes: ${filetypes}`))
  },
  limits: {
    // Need to take a look at this number.
    fileSize: 10 * 1024 * 1024,
  },
})

const mkDirByPathSync = (targetDir) => {
  const { sep } = path;
  targetDir = `../${targetDir}`  // this targetDir is hard code
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = __dirname;

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir, { recursive: true });
    } catch (err) {
      throw err;
    }

    return curDir;
  }, initDir);
}

const generateRandomString = (length, allowedChars) => {
  let text = '';
  const possible =
    allowedChars ||
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = { upload };