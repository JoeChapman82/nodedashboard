/*jshint esversion: 6 */
const ApiCaller = require('../services/api-caller');
const url = 'http://api.openweathermap.org/data/2.5/weather?appid=' + process.env.OPEN_WEATHER_API + '&q=Leeds&units=metric';

const weatherCall = new ApiCaller(url);

module.exports = function (req, res, next) {
  weatherCall.call().then(function(response) {
    res.locals.weatherType = response.weather[0].main;
    res.locals.weatherCity = response.name;
    res.locals.weatherTemp = Math.floor(response.main.temp * 10) / 10;
    res.locals.weatherIcon = response.weather[0].icon;
    next();
  }).catch(function(error) {
    console.log(error);
    next();
  });
};
