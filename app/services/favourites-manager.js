/*jshint esversion: 6 */
const fs = require('fs');

/***************

TODO - Check path variables / consider node-persist / local storage or other storage methods for prod

****************/

const favMan = {
  saveFile : function(req, res) {
  fs.writeFile(`${__dirname}/../public/dashboards/favourites/${req.body.name}.json`, req.body.ordering, function() {
    res.send('saved');
  });
},
  readFile : function(req, res, next) {
    fs.readFile(`${__dirname}/../public/dashboards/favourites/${req.body.fave}.json`, function(error, data) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.locals.retrievedFave = JSON.parse(data);
        res.locals.display = res.locals.retrievedFave[1].display;
        res.locals.loaded = true;
      }
      next();
    });
  },
  getFaves : function(req, res, next) {
    let faveNames = [];
    fs.readdir(__dirname + '/../public/dashboards/favourites', function(err, files) {
      if (err) {
        console.log(err);
      }
      if (files.length >= 1) {
        files.forEach(function(file) {
        let location = file.indexOf('.');
        faveNames.push(file.substring(0, location));
      });
      res.locals.favourites = faveNames;
      next();
    } else {
      next();
    }
    });
  }
};


module.exports = favMan;
