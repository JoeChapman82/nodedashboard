/*jshint esversion: 6 */
const fs = require('fs');
const requireDir = require('require-dir');
const app = require(__dirname + '/../../server');

const dataDirectory = requireDir(__dirname + '/../data-calls');

module.exports = function(req, res, next) {
  let orderingObject = res.locals.retrievedFave || JSON.parse(req.body.ordering);
  let callers = [];
  var toCall = [];

  for (let i = 1; i <= Object.keys(orderingObject).length; i++) {
    if (orderingObject[i].dataCaller && orderingObject[i].dataCallTo.length > 0 && callers.indexOf(orderingObject[i].dataCallTo) === -1) {
      callers.push(orderingObject[i].dataCallTo);
    }
  }

  callers.forEach(function(call) {
    toCall.push(dataDirectory[call]);
  });

res.locals.callers = callers;
res.locals.toCall = toCall;

next();
};
