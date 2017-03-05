/*jshint esversion: 6 */
const express = require('express');
const nunjucks = require('nunjucks');
const expressNunjucks = require('express-nunjucks');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const chokidar = require('chokidar');
const path = require('path');  // TODO set use path
const createDataObject = require(__dirname + '/app/middleware/create-data-object');

module.exports = function(app) {
  app.use(helmet());
  app.use(express.static(path.join(__dirname + '/app/public/')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(['/dashboards/dashboard', '/dashboards/load-fave', '/dashboards/data-calls'], createDataObject);


  app.set('views', [__dirname + '/app/public']);
  app.set('view engine', 'njk');

  nunjucks.configure(__dirname + '/app/public/', {
      autoescape: true,
      express: app,
      useCache: false,
      noCache: true,
      watch: true
    //  throwOnUndefined: true
  });

  return app;
};
