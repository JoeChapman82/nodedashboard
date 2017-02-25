/*jshint esversion: 6 */

module.exports = function(req, res, next) {
  let orderingObject = res.locals.retrievedFave || JSON.parse(req.body.ordering);
  console.log(orderingObject);
  let sizeCounter = 0;
  res.locals.widgets = [];
  res.locals.widgetsTwo = [];
  let destination = res.locals.widgets;
  for (let i = 1; i <= Object.keys(orderingObject).length; i++) {
    console.log(orderingObject[i]);
    sizeCounter += parseInt(orderingObject[i].size);
    if ((orderingObject[i].display === 'pc' && sizeCounter > 8) || (orderingObject[i].display === 'tv' && sizeCounter > 10)) {
      destination = res.locals.widgetsTwo;
    }
      destination.push(orderingObject[i]);
  }
  next();
};
