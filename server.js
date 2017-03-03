/*jshint esversion: 6 */
require('dotenv').config();
const express = require('express');
const app = express();
const browserSync = require('browser-sync')
require(__dirname + '/config')(app);
require(__dirname + '/routes')(app);



const PORT = process.env.PORT || 3000;




var string = "username:password";
var buffer = new Buffer(string);
var toBase64 = buffer.toString('base64');
console.log(string + " encoding to base64 is " + toBase64);

app.listen(PORT, function() {
  console.log('Server listening on port:' + PORT);
});


module.exports = app;

// app.get('/', function(req, res) {
//   res.render('index');
// });
//
// app.get('/dashboards/dashboard-select', function(req, res) {
//   res.render('dashboards/dashboard-select');
// });
//
// app.get('/dashboards/dashboard', function(req, res) {
//   res.render('dashboards/dashboard');
// });
//
// app.get('/dashboards/test-space', function(req, res) {
//   res.render('dashboards/test-space');
// });
//
// app.post('/', [favMan.getFaves, getDefaults, function(req, res) {
//   res.redirect('/dashboards/dashboard-select');
//   }
// ]);
//
// app.post('/dashboards/dashboard-select', [
//   jenkinsCall,
//   calendarCall,
//   weatherCall,
//   xkcdCall,
// //  dataGatherer,
//   genData,
//   dashboardOrder,
//   function(req, res) {
//     res.render('dashboards/dashboard');
//   }
// ]);
