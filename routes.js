/*jshint esversion: 6 */

const request = require('request');
const requireDir = require('require-dir');

const dataDirectory = requireDir(__dirname + '/app/data-calls');

const toCallTemp = [dataDirectory.jenkins, dataDirectory.calendar, dataDirectory.weather, dataDirectory.xkcd, dataDirectory['example-data-generator']];

const dataCallFinder = require(__dirname + '/app/services/data-call-finder');

const dashboardOrder = require(__dirname + '/app/services/dashboard-order');
const favMan = require(__dirname + '/app/services/favourites-manager');
const getDefaults = require(__dirname + '/app/services/default-gather');

module.exports = function(app) {
// app.use('/', dataGatherer());

// GET ROUTES
app.get('/', [
  function(req, res) {
  res.render('index');
}]);

// POST ROUTES
app.post('/dashboards/dashboard-select', [
  favMan.getFaves,
  getDefaults,
  function(req, res) {
  res.render('dashboards/dashboard-select');
}]);

app.post('/dashboards/dashboard', [
  dataCallFinder,
  dashboardOrder,
  ...toCallTemp,
  // ...app.locals.toCall,
  function(req, res) {
  res.render('dashboards/dashboard', {
    hello: 'why hello theere'
   });
}]);

  // Routes for saving and recovering favourites
  app.post('/dashboards/save-fave', favMan.saveFile);

  app.post('/dashboards/retrieve-fave', favMan.readFile);

  app.post('/dashboards/load-fave', [
    favMan.readFile,
    dashboardOrder,
    dataCallFinder,
    ...toCallTemp,
    function(req, res) {
      res.render('dashboards/dashboard');
    }
  ]);

// Routes for ajax calls - TODO - Make one route that gets the appropriate data
app.post('/dashboards/xkcd',[
  dataDirectory.xkcd,
  function(req, res) {
    console.log(res.locals.data.xkcd);

  // res.json(res.locals.data.xkcd);
  res.render('index', {
    hello: 'hello',
    xkcd: res.locals.data.xkcd
  });
}]);

app.post('/dashboards/weather',[dataDirectory.weather, function(req, res) {
  res.send(res.locals.data.weather);
}]);

app.post('/dashboards/calendar',[dataDirectory.calendar, function(req, res) {
  res.send(res.locals.data.calendar);
}]);


//Route any other requests to index;
app.get('*', function(req, res) {
  res.redirect('../');
});

};
