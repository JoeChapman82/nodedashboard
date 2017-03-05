/*jshint esversion: 6 */

const request = require('request');
const requireDir = require('require-dir');

const dataDirectory = requireDir(__dirname + '/app/data-calls');

const dataCaller = require(__dirname + '/app/services/data-caller');

const toCallTemp = [dataDirectory.jenkins, dataDirectory.calendar, dataDirectory.weather, dataDirectory.xkcd, dataDirectory['example-data-generator']];

const dataCallFinder = require(__dirname + '/app/services/data-call-finder');

const dashboardOrder = require(__dirname + '/app/services/dashboard-order');
const favMan = require(__dirname + '/app/services/favourites-manager');
const getDefaults = require(__dirname + '/app/services/default-gather');

module.exports = function(app) {

// GET ROUTE
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
  dataCallFinder,
  // dataCaller.initialCall,
  ...toCallTemp,
  function(req, res) {
  res.render('dashboards/dashboard');
}]);

  // Routes for saving and recovering favourites
  app.post('/dashboards/save-fave', favMan.saveFile);

  app.post('/dashboards/retrieve-fave', favMan.readFile);

  app.post('/dashboards/load-fave', [
    favMan.readFile,
    dashboardOrder,
    dataCallFinder,
  //  dataCaller.initialCall,
    ...toCallTemp,
    function(req, res) {
      res.render('dashboards/dashboard');
    }
  ]);

// Route for ajax calls
app.post('/dashboards/data-calls', [dataCaller.reCall, function(req, res, next) {
  res.json(res.locals.data[req.body.call]);
}]);



//Route any other requests to index; // Change this to app.all?
app.get('*', function(req, res) {
  res.redirect('../');
});

};
