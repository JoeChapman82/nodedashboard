module.exports = function(req, res, next) {
  res.locals.data = {};
  next();
};
