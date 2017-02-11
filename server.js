require('dotenv').config();

var express = require('express');
var helmet = require('helmet');
var app = express();
var PORT = process.env.PORT || 3000;
var nunjucks = require('nunjucks');
var expressNunjucks = require('express-nunjucks');
var browserSync = require('browser-sync');
var bodyParser = require('body-parser');
var request = require('request');

// var calendarCall = require(__dirname + '/app/data-calls/google-calendar/quickstart');
var xkcdCall = require(__dirname + '/app/data-calls/xkcd/xkcd');

var weatherCall = require(__dirname + '/app/data-calls/open-weather/open-weather');

var dummyData = [['apple', 34],['pear', 58], ['plum', 99], ['peach', 23], ['banana', 01], ['grape', 40], ['pineapple', 62], ['peanut', 50],['pommegranite', 72]];
var dummyDataScatter = [[12000, 12], [34752, 76], [9876, 54], [47234, 98], [23395, 7], [17834, 23], [28234, 34], [234, 69], [0,0], [49999, 99],
[12365, 56], [89234, 34], [78234, 34], [99999, 99], [67234, 45], [61456, 40], [91234, 74], [12934, 21]];
var pieData = [['Coding', 5], ['Eating', 2], ['Sleeping', 8], ['Working', 8], ['Traveling', 1], ['Other', 5], ['Things', 7], ['Here', 6]];


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
  function(req, res) {
    res.locals.dummyData = dummyData;
    res.locals.dummyDataScatter = dummyDataScatter;
    res.locals.pieData = pieData;
    res.locals.widgets = req.body.widget;
    res.locals.display = req.body.display;
    if (req.body.display === 'pc') {
    res.render('dashboards/test-space');
  } else if (req.body.display === 'tv'){
    res.render('dashboards/test-space');
  } else if (req.body.display === 'mobile') {
    res.render('dashboards/main-dash');
  } else {
    res.render('index');
  }
  }
]);

app.get('/dashboards/main-dash', function(req, res) {
  res.render('/dashboards/main-dash');
});

app.get('/dashboards/test-space', function(req, res) {
  res.render('/dashboards/test-space');
});

app.get('/', function(req, res) {
  res.render('/dashboards/main-dash-tv');
});

app.get('/', function(req, res) {
  res.render('/dashboards/sort-test');
});



app.listen(PORT, function() {
  console.log('Server listening on port:' + PORT);
//   browserSync({
//   proxy: 'localhost:' + (PORT),
//   port: 3000,
//   ui: false,
//   files: ['public/**/*.*', 'app/public/**/*.*'],
//   ghostmode: false,
//   open: false,
//   notify: true,
//   logLevel: 'error'
// });
});

module.exports = app;
