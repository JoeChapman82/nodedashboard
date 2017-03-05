/*jshint esversion: 6 */
const fs = require('fs');

/***************

TODO - Check path variables / consider node-persist / local storage or other storage methods for prod

****************/

function checkName(str){
    var regEx = /[-_a-zA-Z0-9]/ ;
    return regEx.test(str);
}

const favMan = {
  saveFile : function(req, res) {
    fs.readdir(__dirname + '/../public/dashboards/favourites', function(err, files) {
      if (err) {
      res.send(err);
      return;
      } else if (typeof files !== 'undefined' && files.length >= 10) {
      res.send('Sorry, only 10 Favourites allowed :(');
      return;
      }
    });
    for (let i = 0; i < req.body.name.length; i++) {
      if (checkName(req.body.name[i]) === false) {
      res.send('Invalid file name');
      return;
      }
    }
  fs.writeFile(`${__dirname}/../public/dashboards/favourites/${req.body.name}.json`, req.body.ordering, function() {
  return res.send('saved');
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
      if (typeof files !== 'undefined' && files.length >= 1) {
        files.forEach(function(file) {
          // To ignore .DS_Store file that heroku created
          if (file.indexOf('.') === 0) {
            return;
          }
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
