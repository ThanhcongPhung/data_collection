/* eslint-disable import/no-dynamic-require */
module.exports = (app) => {
  require('fs')
      .readdirSync('./server/routes')
      .forEach((fileName) => {
        if (fileName === 'index.js') return;
        if (['js'].indexOf(fileName.split('.').pop()) === -1) return;
        app.use('/api', require(`./${fileName}`));
      });
};