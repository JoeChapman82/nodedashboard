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

// const calendarCall = require(__dirname + '/app/data-calls/google-calendar/quickstart');
const xkcdCall = require(__dirname + '/app/data-calls/xkcd');
const weatherCall = require(__dirname + '/app/data-calls/open-weather');
const genData = require(__dirname + '/app/data-calls/example-data-generator');

const dashboardOrder = require(__dirname + '/app/services/dashboard-order');
const favMan = require(__dirname + '/app/services/favourites-manager');

app.use(helmet());
app.use(express.static(__dirname + '/app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/app/public');
app.set('view engine', 'njk');

var njk = expressNunjucks(app, {
    watch: true,
    noCache: false
});

var string = "username:password";
var buffer = new Buffer(string);
var toBase64 = buffer.toString('base64');
console.log(string + " encoding to base64 is " + toBase64);

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  res.render('dashboards/dashboard-select');
});

app.post('/dashboard-select', [
//  calendarCall,
  weatherCall,
  xkcdCall,
  genData,
  dashboardOrder,
  function(req, res) {
    res.locals.display = req.body.display;
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

// app.post('/calendar',[calendarCall, function(req, res) {
//   res.send(res.locals.calendar);
// }]);

// Routes for saving and recovering favourites
app.post('/save-fave', favMan.saveFile);

app.post('/retrieve-fave', favMan.readFile);

//re route any other requests to index;
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
