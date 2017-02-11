(function() {

  var canvas = document.getElementById("doughnutChartDisplay");
  var ctx = canvas.getContext("2d");

  // grab data
  var doughnutChartData = document.getElementById('doughnutChartData');
  var title = doughnutChartData.getAttribute('data-title');
  var xLabel = doughnutChartData.getAttribute('data-x');
  var yLabel = doughnutChartData.getAttribute('data-y');
  var data = $('#dataTable');

  var width = canvas.width;
  var height = canvas.height;
  var margin = canvas.width / 30;
  var colours = ['rgba(70, 130, 180, 1)', 'rgba(71, 187, 179, 1)', 'rgba(236, 102, 60, 1)', 'rgba(220, 89, 69, 1)', 'rgba(6, 111, 154, 1)', 'rgba(0, 128, 128, 1)', 'blue', 'pink'];

  // Get data from table and put back into array
  var dataArray = [];
  $("#dataChartDoughnut td").each(function() {
    var item = $(this).text();
    dataArray.push(item);
});

// Separate data and figures
  var arrayNumbers = (function() {
    var loopIndex = 0;
    var  arrForSum = [];
    dataArray.forEach(function(member) {
    if (loopIndex % 2 !== 0) {
      arrForSum.push(parseInt(member));
    }
    loopIndex++;
  });
  return arrForSum;
}());

var arrayItems = (function() {
  var loopIndex = 0;
  var  arrForSum = [];
  dataArray.forEach(function(member) {
  if (loopIndex % 2 === 0) {
    arrForSum.push(member);
  }
  loopIndex++;
});
return arrForSum;
}());

// Find the total of the array
var total = arrayNumbers.reduce(add, 0);
function add(a, b) {
  return a + b;
}

// find % relative to one point of whatever data is supplied
var relativePercent = 100 / total;
var relativeRadian = 2 / total;

function drawTitle() {
  ctx.font = "bold 18px Arial";
  ctx.textAlign = 'center';
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillText(title, width / 2, 20);
}

// Draw pie chart background-color
function drawOutline() {
ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
ctx.arc(width / 2, height / 2 - (2 * margin), (width - (2 * margin)) / 2, 0 * Math.PI, 2 * Math.PI);
ctx.stroke();
ctx.fillStyle = "grey";
ctx.fill();
ctx.closePath();
}

// Now draw pie
function drawPie() {
  var progress = 0; // for calculating distances round cirlce in radians
  var colourIndex = 0;
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  arrayNumbers.forEach(function(section) {
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2 - (2 * margin));
    ctx.arc(width / 2, height / 2 - (2 * margin), (width - (2 * margin)) / 2, progress * Math.PI, (progress + (section * relativeRadian)) * Math.PI);
    ctx.lineTo(width / 2, height / 2 - (2 * margin));
    ctx.stroke();
    ctx.fillStyle = colours[colourIndex];
    ctx.fill();
    ctx.closePath();
    progress += section * relativeRadian;
    colourIndex++;
    if (colourIndex === colours.length) {
      colourIndex = 0;
    }
  });
}

function drawHole() {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(width / 2, height / 2 - (2 * margin), (width - (2 * margin)) / 4, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawKey() {
  var loopIndex = 0;
  var breakSpace = 0;
  var newLines = 0;
  arrayItems.forEach(function(item) {
    ctx.beginPath();
    ctx.rect(margin / 2 + breakSpace, height * 0.85 - newLines, 12, 12);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = colours[loopIndex];
    ctx.fill();
    ctx.font = "12px Arial";
    ctx.textAlign = 'left';
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText(item, margin / 2 + breakSpace + 15, height * 0.85 - newLines);
    ctx.closePath();
    loopIndex++;
    breakSpace += width / 4;
    if (loopIndex > colours.length) {
      loopIndex = 0;
    }
    if (loopIndex === 4) {
      newLines -= 25;
      breakSpace = 0;
    }
  });
}

drawTitle();
drawOutline();
drawPie();
drawKey();
drawHole();
}());
