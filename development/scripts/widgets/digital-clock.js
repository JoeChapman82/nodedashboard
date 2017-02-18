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
