/*jshint esversion: 6 */
const express = require('express');
const nunjucks = require('nunjucks');
const chokidar = require('chokidar');
const expressNunjucks = require('express-nunjucks');
const browserSync = require('browser-sync');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');

module.exports = function(app) {
  app.use(helmet());
  app.use(express.static(path.join(__dirname + '/app/public/')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('views', __dirname + '/app/public');
  app.set('view engine', 'njk');

  nunjucks.configure(__dirname + '/app/public/', {
      autoescape: true,
      express: app,
      useCache: false,
      noCache: true,
      watch: true,
    //  throwOnUndefined: true
  });
  return app;
};
