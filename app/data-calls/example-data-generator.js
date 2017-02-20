/*jshint esversion: 6 */



module.exports = function(req, res, next) {
  let dummyData = [];
  for (let i = 0; i <= (Math.floor(Math.random() * 20) + 5); i++) {
    let randomNum = Math.floor(Math.random() * 100);
    dummyData.push([`Item ${i + 1}`, randomNum]);
  }

  let dummyDataScatter = [];
  for (let i = 0; i <= (Math.floor(Math.random() * 100) + 10); i++) {
    let randomLarge = (Math.floor(Math.random() * 100000) - 1);
    let randomSmall = (Math.floor(Math.random() * 100) - 1);
    dummyDataScatter.push([randomLarge, randomSmall]);
  }

  let pieData = [];
  for (let i = 0; i <= 8; i++) {
    let randomNum = Math.floor(Math.random() * 100);
    pieData.push([`Item ${i + 1}`, randomNum]);
  }

  res.locals.dummyData = dummyData;
  res.locals.dummyDataScatter = dummyDataScatter;
  res.locals.pieData = pieData;
  next();
};