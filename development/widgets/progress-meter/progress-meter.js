if (document.querySelector('#progressMeterDisplay')) {

(function() {

var canvas = document.getElementById("progressMeterDisplay");
var context = canvas.getContext("2d");
var progMetData = document.getElementById('progressMeterData');
var percentInc = 0;
var progMetPercent = progMetData.getAttribute('data-percent');

function drawProgressShadow() {
context.beginPath();
context.arc(100, 100, 80, 0.75 * Math.PI, 0.25 * Math.PI, false);
context.strokeStyle = 'grey';
context.lineCap = 'butt';
context.lineWidth = 35;
context.stroke();
context.closePath();
}

function drawProgress() {
context.beginPath();
context.arc(100, 100, 80, 0.75 * Math.PI, (drawPercent()) * Math.PI, false);
context.strokeStyle = 'rgba(255, 255, 255, 1)';
context.lineCap = 'butt';
context.lineWidth = 35;
context.stroke();
context.font = "bold 40px Arial";
context.fillStyle = "rgba(255, 255, 255, 1)";
  if (percentInc < 10) {
    context.fillText(percentInc + "%", 69, 115);
  } else if (percentInc === 100) {
    context.fillText(percentInc + "%", 52, 115);
  } else {
    context.fillText(percentInc + "%", 62, 115);
  }
context.closePath();
}

function drawPercent() {
  if (percentInc <= 83) {
    return 0.75 + percentInc * 0.015;
  } else {
    return 0.25 - (100 - percentInc) * 0.0138;
  }
}

function mainDraw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawProgressShadow();
  drawProgress();
  percentInc++;
  if (percentInc > progMetPercent) {
    clearInterval(myInt);
  }
}

var myInt = setInterval(mainDraw, 50);

}());

}
