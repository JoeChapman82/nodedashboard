/*jshint esversion: 6 */
const fs = require('fs');

const favMan = {
  saveFile : function(req, res) {
  fs.writeFile('dashboards/favourites/favourite.json', JSON.stringify(req.body), function() {
    console.log(__dirname + '/../public/dashboards/favourites/favourite.json');
    console.log(__dirname);
    console.log('../../..' + __dirname);
    res.send('saved');
  });
},
  readFile : function(req, res) {
    fs.readFile('dashboards/favourites/favourite.json', function(error, data) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(JSON.parse(data));
        res.send(JSON.parse(data));
      }
    });
  }
};


module.exports = favMan;
