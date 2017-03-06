module.exports = function(req, res) {
  if (req.body.type === 'html') {
  res.render('nunjucks/partials/' + req.body.reply);
  } else if (req.body.type === 'json') {
  res.json(res.locals.data[req.body.call]);
  }
};
