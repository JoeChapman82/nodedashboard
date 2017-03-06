function countdown() {
var myDate = new Date($('#countdownDueDate').text()); // Format '25-Feb-2017 00:00:00'
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
