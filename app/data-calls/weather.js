/*jshint esversion: 6 */
const ApiCaller = require('../services/api-caller');
const url = 'http://api.openweathermap.org/data/2.5/weather?appid=' + process.env.OPEN_WEATHER_API + '&q=Leeds&units=metric';

const weatherCall = new ApiCaller(url);

module.exports = function (req, res, next) {
  weatherCall.call().then(function(response) {
    res.locals.data.weather = response;
    next();
  });
};
