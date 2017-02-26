/*jshint esversion: 6 */
const fs = require('fs');
const requireDir = require('require-dir');

const dataDirectory = requireDir(__dirname + '/../data-calls');


// module.exports = function(req, res, next) {
// let orderingObject = res.locals.retrievedFave || JSON.parse(req.body.ordering);
// console.log(orderingObject);
// console.log('------');
// let toCall = [];
// Object.keys(orderingObject).forEach(function(item) {
//   if (orderingObject[item].dataRate > 1) {
//     toCall.push(orderingObject[item].widget);
//   }
// });
// toCall.forEach(function(call) {
//   dataDirectory[call](req, res).done();
//
// });
//   next();
// };

 // module.exports = function(req, res, next) {
 //  let orderingObject = res.locals.retrievedFave || JSON.parse(req.body.ordering);
 //  let toCall = [];
 //  Object.keys(orderingObject).forEach(function(item) {
 //    if (item.dataCaller) {
 //      toCall.push(item.widget);
 //    }
 //  });
 //  fs.readdir(__dirname + '/../data-calls', function(err, files) {
 //    if (err) {
 //      console.log(err);
 //    } else {
 //
 //    }
 //  });
 //  };
