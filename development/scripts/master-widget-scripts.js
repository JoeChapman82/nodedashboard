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

    // TODO set up all charts to accept arrays and objects as data

    //   var barInterval = setInterval(function() {
    //     if (document.hasFocus()) {
    //     $.ajax({
    //       type: "POST",
    //       url: 'data-calls',
    //       data: {call: 'example-data-generator'},
    //       success: function(data, status) {
    //       }
    //     });
    //   }
    // }, parseInt(document.querySelector('.widget-barChart').dataset.rate));

  }());
}

if (document.querySelector('.widget-calendar')) {
setInterval(function() {
$.ajax({
  type: "POST",
  url: 'data-calls',
  data: {call: 'calendar'},
  success: function(data, status) {
    $('#events').html('');
    if (data.length < 1) {
      $('#events').append('<i class="fa fa-calendar calendar-icon" aria-hidden="true"></i>No events today</p>');
    } else {
      for (var i = 0; i < data.length; i++) {
        $('#events').append('<p class="calendar-event"><i class="fa fa-calendar calendar-icon" aria-hidden="true"></i>' + data[i].start + ' <br>' + data[i].summary + '</p>');
      }
    }
  }
});
}, parseInt(document.querySelector('.widget-calendar').dataset.rate));
};

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

if (document.getElementById('doughnutChartDisplay')) {
  (function() {
    var doughnutChart = new Chart('doughnutChartDisplay', 'doughnutChartData', 'dataChartDoughnut');
    doughnutChart.doughnutChart();
  }());
}

if (document.getElementById('progressMeterDisplay')) {
    var progressExample = new Progress('progressMeterDisplay', 'progressMeterData');
    progressExample.interval(50);

  var progInterval = setInterval(function() {
    // Don't make another request if window not active - It makes the other intervals stack
    if (document.hasFocus()) {
      var d = new Date();
      var m = d.getMinutes() < 10 ? '0' + d.getMinutes(): d.getMinutes();
      var s = d.getSeconds() < 10 ? '0' + d.getSeconds(): d.getSeconds();
      $.ajax({
        type: "POST",
        url: 'data-calls',
        data: {call: 'example-data-generator'},
        success: function(data, status) {
          document.getElementById('progressMeterData').dataset.percent = data.randomNumber;
          progressExample.progMetPercent = data.randomNumber;
          progressExample.interval(50);
          document.getElementById('progressTime').innerText = "Last updated at " + d.getHours() + ":"  + m + ":" + s;
        }
      });
    }
  }, parseInt(document.querySelector('.widget-progress').dataset.rate));
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

if (document.querySelector('#weatherOne')) {
setInterval(function() {
$.ajax({
  type: "POST",
  url: 'data-calls',
  data: {call: 'weather'},
  success: function(data, status) {
    $('.icon-background-weather i').attr('class', 'wi wi-' + data.weather[0].icon);
    $('.weather-city').text(data.name + ' Weather');
    $('.weather-type').text(data.weather[0].main);
    $('.weather-temp').text(data.main.temp + '°C');
  }
});
}, parseInt(document.getElementById('weatherOne').dataset.rate));
};

if (document.querySelector('#xkcdOne')) {
setInterval(function() {
$.ajax({
  type: "POST",
  url: 'data-calls',
  data: {call: 'xkcd'},
  success: function(data, status) {
    $('.xkcd-heading').html('XKCD: ' + data.num + '<br>' + data.safe_title);
    $('.xkcd-comic').attr('src', data.img);
  }
});
}, parseInt(document.getElementById('xkcdOne').dataset.rate));
};

window.onload = function() {

if (document.querySelectorAll('.timestamp')) {
  document.querySelectorAll('.timestamp').forEach(function(timestamp) {
    timestamp.innerText = new Date(parseInt(timestamp.innerText)).toUTCString();
  });
}

};

console.log('hello');
