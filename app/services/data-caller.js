/*jshint esversion: 6 */

const requireDir = require('require-dir');
const dataDirectory = requireDir(__dirname + '/../data-calls');

// module.exports = function(req, res, next) {
//     dataDirectory[req.body.call](req, res, next);
// };

// TODO Initial call should await response

const dataCaller = {
  reCall: function(req, res, next) {
    dataDirectory[req.body.call](req, res, next);
  },
  initialCall: function(req, res, next) {
    res.locals.toCall.forEach(function(call) {
      call(req, res, next);
    });
    next();
  }
};

module.exports = dataCaller;
