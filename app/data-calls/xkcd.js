/*jshint esversion: 6 */
const ApiCaller = require('../services/api-caller');
let url = 'http://xkcd.com/' + (Math.floor(Math.random() * (1795 - 1 + 1) +1))  + '/info.0.json';

const xkcdCall = new ApiCaller(url);

module.exports = function (req, res, next) {
  xkcdCall.options.url = 'http://xkcd.com/' + (Math.floor(Math.random() * (1795 - 1 + 1) +1))  + '/info.0.json';
  xkcdCall.call().then(function(response) {
    res.locals.xkcd = response;
    next();
  });
};
