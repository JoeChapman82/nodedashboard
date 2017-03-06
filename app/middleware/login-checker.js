module.exports = function(req, res, next) {
  if (process.env.USERNAME && process.env.PASSWORD && process.env.NODE_ENV !== 'development') {
  if(req.body.username !== process.env.USERNAME || req.body.password !== process.env.PASSWORD) {
    res.redirect('../');
  } else {
    next();
  }
} else {
  next();
}
};
