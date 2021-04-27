const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
// const { CDN_URL } = require('../configs');

const uploadFile = async (filePath, destination, name) => {
  try {
    const reader = fs.createReadStream(filePath);
    const form = new FormData();
    if (destination) form.append('destination', destination);
    if (name) form.append('name', name);
    form.append('file', reader);

    const response = await axios({
      method: 'POST',
      url: 'http://43.239.223.87:5087/api/v1/uploads/file',
      data: form,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
        'Authorization': 'Bearer zyvZQGPrr6qdbHLTuzqpCmuBgW3TjTxGKEEIFCiy1lCAOzTBtrqPYdPdZ1AtMxUo2',
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log('Successfully upload', response.data);
  } catch (error) {
    console.error('Upload file error:', error.message);
  }
};

module.exports = uploadFile;