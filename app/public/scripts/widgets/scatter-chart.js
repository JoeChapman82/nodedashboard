(function () {

  var canvas = document.getElementById("scatterChartDisplay");
  var ctx = canvas.getContext("2d");

  // grab data
  var scatterChartData = document.getElementById('scatterChartData');
  var title = scatterChartData.getAttribute('data-title');
  var xLabel = scatterChartData.getAttribute('data-x');
  var yLabel = scatterChartData.getAttribute('data-y');
  var data = $('#dataChartScatter');

  var width = canvas.width;
  var height = canvas.height;
  var margin = canvas.width / 10;
  var markers = 5;

  // Get data from table and put back into array
  var dataArray = [];
  $("#dataChartScatter td").each(function() {
    var item = $(this).text();
    dataArray.push(item);
});

// Separate data and figures
var arrayNumbersX = (function() {
  var loopIndex = 0;
  var  arrForSum = [];
  dataArray.forEach(function(member) {
  if (loopIndex % 2 === 0) {
    arrForSum.push(parseInt(member));
  }
  loopIndex++;
});
return arrForSum;
}());

var arrayNumbersY = (function() {
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

// Find the highest number in the array
var highestInArrayX = Math.max(Math.max.apply(Math, arrayNumbersX)); // 98
// Find the top of the y axis eg where (100 < x > 10) it should be 100, where (1000 < x > 100) it should be 1000
var xPeak = Math.ceil(highestInArrayX / Math.pow(10, highestInArrayX.toString().length)) * Math.pow(10, highestInArrayX.toString().length);
// Lower peak if highest is less than 5x
if (highestInArrayX.toString()[0] < 5) {
  xPeak /= 2;
}

// Do the same for the x axis
var highestInArrayY = Math.max(Math.max.apply(Math, arrayNumbersY)); // 98
// Find the top of the y axis eg where (100 < x > 10) it should be 100, where (1000 < x > 100) it should be 1000
var yPeak = Math.ceil(highestInArrayY / Math.pow(10, highestInArrayY.toString().length)) * Math.pow(10, highestInArrayY.toString().length);
// Lower peak if highest is less than 5x
if (highestInArrayY.toString()[0] < 5) {
  yPeak /= 2;
}

var relativePointX = (width - 2 * margin) / xPeak;
var relativePointY = (height - 2 * margin) / yPeak;

// draw heading
  function drawTitle() {
    ctx.font = "bold 18px Arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText(title, width / 2, 20);
  }

  function drawAxis() {
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(margin, margin);
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin,height - margin);
    ctx.stroke();
    // confusing rotate and restore for veritcal text
    ctx.save();
    ctx.translate(width, height);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText(yLabel, height / 2, -width + margin / 2);
    ctx.restore();
    ctx.fillText(xLabel, width / 2, height - 4); //Height minus quart font size to stop tails disappearing
    ctx.closePath();
  }

  function drawMarkers() {
    ctx.font = "12px Arial";
    ctx.textAlign = 'center';
    ctx.fillText('0', margin - 6, (height - margin) + 12);
    for (i = 1; i < markers + 1; i++) {
      ctx.textAlign = 'start';
      ctx.fillText(xPeak / markers * i, (width - (2 * margin)) / markers * i, (height - margin) + 12); // this is wrong. Last number should start at end of x axis
      ctx.fillText(yPeak / markers * i, margin / 2, margin + (height - (2 * margin)) / markers * (markers - i));
    }
  }

  function drawChartPoints() {
    for (i = 0; i < arrayNumbersX.length; i++) {
      ctx.beginPath();
      ctx.arc(margin + arrayNumbersX[i] * relativePointX, (height - margin) - (arrayNumbersY[i] * relativePointY), 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle ='rgba(70, 130, 180, 1)';
      ctx.fill();
      ctx.closePath();
    }
  }

  drawTitle();
  drawAxis();
  drawMarkers();
  drawChartPoints();

}());
