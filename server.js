/*jshint esversion: 6 */
require('dotenv').config();
const express = require('express');
const app = express();
require(__dirname + '/config')(app);
require(__dirname + '/routes')(app);

const PORT = process.env.PORT || 3000;

// var string = "username:password";
// var buffer = new Buffer(string);
// var toBase64 = buffer.toString('base64');
// console.log(string + " encoding to base64 is " + toBase64);

app.listen(PORT, function() {
  console.log('Server listening on port:' + PORT);
});


module.exports = app;
