/*jshint esversion: 6 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;
const nunjucks = require('nunjucks');
const expressNunjucks = require('express-nunjucks');
const browserSync = require('browser-sync');
const bodyParser = require('body-parser');
const request = require('request');

const calendarCall = require(__dirname + '/app/data-calls/calendar');
const xkcdCall = require(__dirname + '/app/data-calls/xkcd');
const weatherCall = require(__dirname + '/app/data-calls/weather');
const genData = require(__dirname + '/app/data-calls/example-data-generator');

const dataGatherer = require(__dirname + '/app/services/data-gather');

const dashboardOrder = require(__dirname + '/app/services/dashboard-order');
const favMan = require(__dirname + '/app/services/favourites-manager');
const getDefaults = require(__dirname + '/app/services/default-gather');

app.use(helmet());
app.use(express.static(__dirname + '/app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/app/public');
app.set('view engine', 'njk');

nunjucks.configure(__dirname + '/app/public/', {
    autoescape: true,
    express: app,
    // throwOnUndefined: true
});

var string = "username:password";
var buffer = new Buffer(string);
var toBase64 = buffer.toString('base64');
console.log(string + " encoding to base64 is " + toBase64);

// Routes
app.get('/', function(req, res) {
  console.log(process.env);
  res.render('index');
});

app.get('/dashboards/test-space', function(req, res) {
  res.render('dashboards/test-space');
});

app.post('/', [favMan.getFaves, getDefaults, function(req, res) {
  res.render('dashboards/dashboard-select');
  }
]);

app.post('/dashboard-select', [
  calendarCall,
  weatherCall,
  xkcdCall,
//  dataGatherer,
  genData,
  dashboardOrder,
  function(req, res) {
  console.log(req.body);  // res.locals.display = req.body.display;
    res.render('dashboards/dashboard');
  }
]);

app.post('/load-fave', [
  favMan.readFile,
  calendarCall,
  weatherCall,
  xkcdCall,
  genData,
  dashboardOrder,
  function(req, res) {
    res.render('dashboards/dashboard');
  }
]);

// Routes for ajax calls
app.post('/xkcd',[xkcdCall, function(req, res) {
  res.json(res.locals.xkcd);
}]);

app.post('/weather',[weatherCall, function(req, res) {
  res.send([res.locals.weatherType, res.locals.weatherCity, res.locals.weatherTemp, res.locals.weatherIcon]);
}]);

app.post('/calendar',[calendarCall, function(req, res) {
  res.send(res.locals.calendar);
}]);

// Routes for saving and recovering favourites
app.post('/save-fave', favMan.saveFile);

app.post('/retrieve-fave', favMan.readFile);

//Route any other requests to index;
app.get('*', function(req, res) {
  res.render('index');
});


app.listen(PORT, function() {
  console.log('Server listening on port:' + PORT);
  if (!process.env.PORT) {
  browserSync({
  proxy: 'localhost:' + (PORT),
  reloadDelay: 1000,
  ui: false,
  files: ['app/public/**/*.*'],
  ghostmode: false,
  open: false,
  notify: true,
  logLevel: 'error'
});
}
});

module.exports = app;
