/*jshint esversion: 6 */
const fs = require('fs');

const favMan = {
  saveFile : function(req, res) {
  fs.writeFile(__dirname + '/../public/dashboards/favourites/favourite.json', JSON.stringify(req.body), function() {
    res.send('saved');
  });
},
  readFile : function(req, res) {
    fs.readFile(__dirname + '/../public/dashboards/favourites/favourite.json', function(error, data) {
      if (error) {
        res.send(error);
      } else {
        res.send(JSON.parse(data));
      }
    });
  }
};


module.exports = favMan;
