const express = require('express');
const router = express.Router();
const uploadService = require('../services/upload')
const multer = require('multer')

router.post('/file', uploadService.upload.single('soundBlob'), (req, res, err ) => {

  // the err ^^^^^^ there doesn't seem to be err but rather something else... But either way it works for now, the thing up there doesn't matter that much.
  if (err instanceof multer.MulterError) {
    console.log(`err: ${err}`)
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return new Error("Exceed file limit size");
      // case 'LIMIT_PART_COUNT':
      //   return next(
      //     new CustomError(errorCodes.LIMIT_PART_COUNT, err.message),
      //   );
      // case 'LIMIT_FILE_COUNT':
      //   return next(
      //     new CustomError(errorCodes.LIMIT_FILE_COUNT, err.message),
      //   );
      // case 'LIMIT_FIELD_KEY':
      //   return next(new CustomError(errorCodes.LIMIT_FIELD_KEY, err.message));
      // case 'LIMIT_FIELD_VALUE':
      //   return next(
      //     new CustomError(errorCodes.LIMIT_FIELD_VALUE, err.message),
      //   );
      // case 'LIMIT_FIELD_COUNT':
      //   return next(
      //     new CustomError(errorCodes.LIMIT_FIELD_COUNT, err.message),
      //   );
      // case 'LIMIT_UNEXPECTED_FILE':
      //   return next(
      //     new CustomError(errorCodes.LIMIT_UNEXPECTED_FILE, err.message),
      //   );
      default:
        return next(new Error("Can't upload the file\n"));
    }
  } else if (err) {
    console.log(err)
  }
  
  try {
    return res.status(200).send({ success: true })
  } catch (error) {
    console.log("Dead")
    res.status(500).send({ success: false, error })
  }
})

module.exports = router;