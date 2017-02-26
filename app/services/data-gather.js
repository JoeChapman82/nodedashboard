// /*jshint esversion: 6 */
// const fs = require('fs');
// const requireDir = require('require-dir');
//
// const dataDirectory = requireDir(__dirname + '/../data-calls');
//
//
// let orderingObject = {
//   "stylesheet": "",
//   "switchMethod": "switch",
//   "widgets": {
//     "aClock": {
//       "name": "aClock",
//       "displayName": "Analogue Clock",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "barChart": {
//       "name": "barChart",
//       "displayName": "Bar Chart",
//       "width": 2,
//       "height": 1,
//       "dataCaller": false
//     },
//     "calendar": {
//       "name": "calendar",
//       "displayName": "Google Calendar",
//       "width": 1,
//       "height": 1,
//       "dataCaller": true,
//       "dataRate": 3600000
//     },
//     "countdown": {
//       "name": "countdown",
//       "displayName": "Countdown",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "dClock" : {
//       "name": "dClock",
//       "displayName": "Digital Clock",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "doughnutChart": {
//       "name": "doughnutChart",
//       "displayName": "Doughnut Chart",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "jenkins": {
//       "name": "jenkins",
//       "displayName": "Jenkins Jobs",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "map": {
//       "name": "map",
//       "displayName": "Google Map",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "notices": {
//       "name": "notices",
//       "displayName": "Notices",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "pieChart": {
//       "name": "pieChart",
//       "displayName": "Pie Chart",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "progress": {
//       "name": "progress",
//       "displayName": "Progress Meter",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "scatterChart": {
//       "name": "scatterChart",
//       "displayName": "Scatter Chart",
//       "width": 1,
//       "height": 1,
//       "dataCaller": false
//     },
//     "weather": {
//       "name": "weather",
//       "displayName": "Weather",
//       "width": 1,
//       "height": 1,
//       "dataCaller": true,
//       "dataRate": 900000
//     },
//     "xkcd": {
//       "name": "xkcd",
//       "displayName": "Random XKCD",
//       "width": 2,
//       "height": 1,
//       "dataCaller": true,
//       "dataRate": 900000
//     }
//   }
// };
//
// console.log(Object.keys(orderingObject.widgets))
// var toCall = Object.keys(orderingObject.widgets).map(function(currentVal, index, originalArray) {
//   if (currentVal.widgets) {
//   return currentVal;
// }
// });
//
// console.log(toCall)


// forEach(function(item) {
//   if (orderingObject[item].dataRate > 1) {
//     toCall.push(orderingObject[item].widget);
//   }
// });
// toCall.forEach(function(call) {
//   dataDirectory[call](req, res).done();

// });


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
