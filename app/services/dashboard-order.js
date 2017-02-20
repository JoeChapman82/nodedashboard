/*jshint esversion: 6 */

module.exports = function(req, res, next) {
  let orderingObject = JSON.parse(req.body.ordering);
  let sizeCounter = 0;
  res.locals.widgets = [];
  res.locals.widgetsTwo = [];
  let destination = res.locals.widgets;
  for (let i = 1; i < Object.keys(orderingObject).length; i++) {
    sizeCounter += orderingObject[i].size;
    if ((req.body.display === 'pc' && sizeCounter > 8) || (req.body.display === 'tv' && sizeCounter > 10)) {
      destination = res.locals.widgetsTwo;
    }
      destination.push(orderingObject[i].widget);
  }
  console.log(res.locals.widgets);
  console.log(res.locals.widgetsTwo);
  next();
};
