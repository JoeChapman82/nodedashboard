(function () {

  var canvasBarC = document.getElementById("barChartDisplay");
  var ctxBarC = canvasBarC.getContext("2d");

  // grab data
  var barChartData = document.getElementById('barChartData');
  var titleBarC = barChartData.getAttribute('data-title');
  var xLabelBarC = barChartData.getAttribute('data-x');
  var yLabelBarC = barChartData.getAttribute('data-y');
  var dataBarC = $('#dataTable');

  var widthBarC = canvasBarC.width;
  var heightBarC = canvasBarC.height;
  var marginBarC = canvasBarC.width / 30;
  var columnPadding = canvasBarC.width / 120;
  var colours = ['rgba(70, 130, 180, 1)', 'rgba(71, 187, 179, 1)', 'rgba(236, 102, 60, 1)', 'rgba(220, 89, 69, 1)', 'rgba(6, 111, 154, 1)', 'rgba(0, 128, 128, 1)', 'blue', 'pink'];
  // Math.floor(Math.random()*(colours.length - 1 + 1) + 1)

  // Get data from table and put back into array
  var dataArrayBarC = [];
  $("#dataChart td").each(function() {
    var item = $(this).text();
    dataArrayBarC.push(item);
});

// Separate data and figures
  var arrayNumbersBarC = (function() {
    var loopIndex = 0;
    var  arrForSum = [];
    dataArrayBarC.forEach(function(member) {
    if (loopIndex % 2 !== 0) {
      arrForSum.push(parseInt(member));
    }
    loopIndex++;
  });
  return arrForSum;
}());

var arrayItemsBarC = (function() {
  var loopIndex = 0;
  var  arrForSum = [];
  dataArrayBarC.forEach(function(member) {
  if (loopIndex % 2 === 0) {
    arrForSum.push(member);
  }
  loopIndex++;
});
return arrForSum;
}());

// And create an empty array the same length as the numbers array to be used for animating
var animateArray = [];
arrayNumbersBarC.forEach(function() {
  animateArray.push(0);
});

// Find the highest number in the array
var highestInArray = Math.max(Math.max.apply(Math, arrayNumbersBarC)); // 98
// Find the top of the y axis eg where (100 < x > 10) it should be 100, where (1000 < x > 100) it should be 1000
var yPeakBarC = Math.ceil(highestInArray / Math.pow(10, highestInArray.toString().length)) * Math.pow(10, highestInArray.toString().length);
// Lower peak if highest is less than 5x
if (highestInArray.toString()[0] < 5) {
  yPeakBarC /= 2;
}

// Now set up columns
var columnNumber = arrayNumbersBarC.length;
var columnWidth = ((widthBarC - 2 * marginBarC) - ((columnNumber - 2) * columnPadding)) / columnNumber;
var relativePoint = (heightBarC - 2 * marginBarC) / yPeakBarC;

// draw heading
  function drawTitle() {
    ctxBarC.font = "bold 18px Arial";
    ctxBarC.textAlign = 'center';
    ctxBarC.fillStyle = "rgba(0, 0, 0, 1)";
    ctxBarC.fillText(titleBarC, widthBarC / 2, 20);
  }

// draw columns, labels and data points
  function drawBarChart() {
    colourPicker = 0;
    for (i = 0; i < columnNumber; i++) {
      ctxBarC.beginPath();
      ctxBarC.lineWidth = "2";
      ctxBarC.strokeStyle = "grey";
      var grd = ctxBarC.createLinearGradient(0, heightBarC, 0, heightBarC * 0.25);
      grd.addColorStop(0,"white");
      grd.addColorStop(1,colours[colourPicker]);
      ctxBarC.rect(marginBarC + (i * columnWidth) + ((i - 1) * columnPadding), (heightBarC - marginBarC) - (animateArray[i] * relativePoint), columnWidth, animateArray[i] * relativePoint);
      ctxBarC.fillStyle = grd;
      ctxBarC.fill();
      ctxBarC.stroke();
      ctxBarC.font = "16px Arial";
      ctxBarC.textAlign = 'center';
      ctxBarC.fillStyle = "rgba(0, 0, 0, 1)";
      ctxBarC.fillText(arrayItemsBarC[i], marginBarC + (i  * columnWidth) + ((i - 1) * columnPadding) + (columnWidth / 2), heightBarC - marginBarC + 16, columnWidth);
      if (animateArray[i] > yPeakBarC / 10) {
        ctxBarC.fillText(animateArray[i], marginBarC + (i  * columnWidth) + ((i - 1) * columnPadding) + (columnWidth / 2), (heightBarC - marginBarC) - (animateArray[i] * relativePoint) + 16, columnWidth);
      } else {
        ctxBarC.fillText(animateArray[i], marginBarC + (i  * columnWidth) + ((i - 1) * columnPadding) + (columnWidth / 2), (heightBarC - marginBarC) - (animateArray[i] * relativePoint) - columnPadding, columnWidth);
      }
      ctxBarC.closePath();
      // return to begining of colours array if length exceeded
      colourPicker++;
      if (colourPicker > colours.length - 1) {
        colourPicker = 0;
      }
    }
  }

  function mainDrawBarC() {
    ctxBarC.clearRect(0, 0, canvasBarC.width, canvasBarC.height);
    drawTitle();
    drawBarChart();
    for (i = 0; i < animateArray.length; i++){
      if (animateArray[i] < arrayNumbersBarC[i]) {
        animateArray[i]++;
        if (animateArray[i] > highestInArray) {
          clearInterval(drawBarC);
        }
      }
    }

  }

  var drawBarC = setInterval(mainDrawBarC, 50);

}());
