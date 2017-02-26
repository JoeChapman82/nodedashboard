// TODO - redo this
if (document.getElementById("clock"))
(function() {
function setTime() {

var canvas = document.getElementById("clock");
var context = canvas.getContext("2d");
var clockRadius = canvas.width / 2;

context.beginPath();

context.fillStyle = "grey";
context.arc(clockRadius, clockRadius, clockRadius, 0, 2*Math.PI);
context.fill();

context.fillStyle = "white";

context.beginPath();
context.arc(clockRadius, clockRadius, 10, 0, 2*Math.PI);
context.fill();

context.font = clockRadius / 10 + "px arial";
context.textAlign = "center";
context.textBaseline = "middle";

for (var i = 1; i <= 12; i++) {

    context.fillText(i, clockRadius + clockRadius * 0.9 * Math.sin(i * 2*Math.PI / 12), clockRadius - (clockRadius * 0.9 * Math.cos(i * 2 * Math.PI / 12)));

}


var hours = new Date().getHours();
var minutes = new Date().getMinutes();
var seconds = new Date().getSeconds();

var fullHours = hours % 12 + minutes / 60 + seconds / 3600;

var hoursAngle = fullHours * 2 * Math.PI / 12;
var minutesAngle = minutes * 2 * Math.PI / 60;
var secondsAngle = seconds * 2 * Math.PI / 60;

context.strokeStyle = "white";
context.moveTo(clockRadius, clockRadius);
context.lineTo(clockRadius + clockRadius * 0.6 * Math.sin(hoursAngle), clockRadius - (clockRadius * 0.6 * Math.cos(hoursAngle)));
context.lineWidth = 5;
context.stroke();

context.moveTo(clockRadius, clockRadius);
context.lineTo(clockRadius + clockRadius * 0.8 * Math.sin(minutesAngle), clockRadius - (clockRadius * 0.8 * Math.cos(minutesAngle)));
context.lineWidth = 3;
context.stroke();

context.moveTo(clockRadius, clockRadius);
context.lineTo(clockRadius + clockRadius * 0.9 * Math.sin(secondsAngle), clockRadius - (clockRadius * 0.9 * Math.cos(secondsAngle)));
context.lineWidth = 2;
context.stroke();

}

setInterval(setTime, 1000);

}());

if (document.getElementById('barCanvas')) {
  (function() {
    var myChart = new Chart('barCanvas', 'barDataDiv', 'barTable');
    myChart.interval(50);
  }());
}

function countdown() {
var myDate = new Date($('#countdownDueDate').text()); // '25-Feb-2017 00:00:00'
var todaysDate = new Date();
var difDate = new Date(myDate - todaysDate);
var daysLeft = Math.floor(difDate/86400000);
var hoursLeft = difDate.getHours();
var minutesLeft = difDate.getMinutes();
var secondsLeft = difDate.getSeconds();
if (secondsLeft < 10) {
  secondsLeft = '0' + secondsLeft;
}
if (minutesLeft < 10) {
  minutesLeft = '0' + minutesLeft;
}

if (daysLeft !== 0) {
$('#countdownTimerDays').text(daysLeft + ' days');
}
$('#countdownTimerTime').text(hoursLeft + ':' + minutesLeft + ':' + secondsLeft);

}

setInterval(countdown, 1000);

if (document.getElementById('doughnutChartDisplay')) {
  (function() {
    var doughnutChart = new Chart('doughnutChartDisplay', 'doughnutChartData', 'dataChartDoughnut');
    doughnutChart.doughnutChart();
  }());
}

function digitalClock() {
var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
if (m < 10) {
  m = '0' + m;
}
if (s < 10) {
  s = '0' + s;
}
var date = today.toDateString();
var time = h + ":" + m + ":" + s;
$('#digitalDate').text(date);
$('#digitalTime').text(time);
}

setInterval(digitalClock, 1000);

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

if (document.getElementById('pieChartDisplay')) {
  (function() {
    var pieChart = new Chart('pieChartDisplay', 'pieChartData', 'dataChartPie');
    pieChart.pieChart();
  }());
}

if (document.getElementById('scatterChartDisplay')) {
  (function() {
    var scatterChart = new Chart('scatterChartDisplay', 'scatterChartData', 'dataChartScatter');
    scatterChart.scatterChart();
  }());
}
