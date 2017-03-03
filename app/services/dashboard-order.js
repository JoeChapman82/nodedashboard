/*jshint esversion: 6 */

module.exports = function(req, res, next) {
  let orderingObject = res.locals.retrievedFave || JSON.parse(req.body.ordering);
  let sizeCounter = 0;
  res.locals.widgets = [];
  res.locals.widgetsTwo = [];
  res.locals.widgetsThree = [];
  res.locals.widgetsFour = [];
  let destination = res.locals.widgets;
  for (let i = 1; i <= Object.keys(orderingObject).length; i++) {
    sizeCounter += parseInt(orderingObject[i].size);
    if ((orderingObject[i].display === 'pc' && sizeCounter > 24) || (orderingObject[i].display === 'tv' && sizeCounter > 30)) {
      destination = res.locals.widgetsFour;
    } else if ((orderingObject[i].display === 'pc' && sizeCounter > 16) || (orderingObject[i].display === 'tv' && sizeCounter > 20)) {
      destination = res.locals.widgetsThree;
    } else if ((orderingObject[i].display === 'pc' && sizeCounter > 8) || (orderingObject[i].display === 'tv' && sizeCounter > 10)) {
      destination = res.locals.widgetsTwo;
    }
      destination.push(orderingObject[i]);
  }
  next();
};
