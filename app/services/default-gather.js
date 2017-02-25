/*jshint esversion: 6 */
const fs = require('fs');

module.exports = function(req, res, next) {
  fs.readFile(`${__dirname}/../defaults/defaults.json`, function(error, data) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.locals.defaults = JSON.parse(data);
    }
    next();
  });
};
