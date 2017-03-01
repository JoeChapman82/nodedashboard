/*jshint esversion: 6 */

const request = require('request');

const calendarCall = require(__dirname + '/app/data-calls/calendar');
const genData = require(__dirname + '/app/data-calls/example-data-generator');
const jenkinsCall = require(__dirname + '/app/data-calls/jenkins');
const weatherCall = require(__dirname + '/app/data-calls/weather');
const xkcdCall = require(__dirname + '/app/data-calls/xkcd');

const dataGatherer = require(__dirname + '/app/services/data-gather');

const dashboardOrder = require(__dirname + '/app/services/dashboard-order');
const favMan = require(__dirname + '/app/services/favourites-manager');
const getDefaults = require(__dirname + '/app/services/default-gather');

module.exports = function(app) {

// GET ROUTES
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/dashboards/dashboard-select', [favMan.getFaves, getDefaults,function(req, res) {
  res.render('dashboards/dashboard-select');
}]);

app.get('/dashboards/dashboard', [
  jenkinsCall,
  calendarCall,
  weatherCall,
  xkcdCall,
//  dataGatherer,
  genData,
  function(req, res) {
  res.render('dashboards/dashboard', {
     widgets: widgets,
     widgetsTwo: widgetsTwo
   });
}]);

// POST ROUTES
app.post('/', function(req, res) {
  res.redirect('/dashboards/dashboard-select');
  });

app.post('/dashboards/dashboard-select', [
  dashboardOrder,
  function(req, res) {
    widgets = res.locals.widgets;
    widgetsTwo = res.locals.widgetsTwo;
    res.redirect('/dashboards/dashboard');
  }]);

  // Routes for saving and recovering favourites
  app.post('/dashboards/save-fave', favMan.saveFile);

  app.post('/dashboards/retrieve-fave', favMan.readFile);

  app.post('/dashboards/load-fave', [
    favMan.readFile,
    dashboardOrder,
    function(req, res) {
      widgets = res.locals.widgets;
      widgetsTwo = res.locals.widgetsTwo;
      res.redirect('/dashboards/dashboard');
    }
  ]);

// Routes for ajax calls
app.post('/dashboards/xkcd',[xkcdCall, function(req, res) {
  res.json(res.locals.data.xkcd);
}]);

app.post('/dashboards/weather',[weatherCall, function(req, res) {
  res.send(res.locals.data.weather);
}]);

app.post('/dashboards/calendar',[calendarCall, function(req, res) {
  res.send(res.locals.data.calendar);
}]);


//Route any other requests to index;
app.get('*', function(req, res) {
  res.render('/404');
});

};
