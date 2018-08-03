/*jshint esversion: 6 */
require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const key = fs.readFileSync(path.join(__dirname, '/development/certs/server.key'));
const cert = fs.readFileSync(path.join(__dirname, '/development/certs/server.crt'));
const options = {key: key, cert: cert};

require(__dirname + '/config')(app);
require(__dirname + '/routes')(app);

const PORT = process.env.PORT || 3000;

https.createServer(options, app).listen(PORT, function () {
    console.log('Express HTTPS server listening on port ' + PORT);
});


module.exports = app;
