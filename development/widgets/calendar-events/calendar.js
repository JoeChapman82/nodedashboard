if (document.querySelector('.widget-calendar')) {

  var calendarCall = new Scheduler('.widget-calendar', function(data, status) {
    $('.widget-calendar').html(data);
  }, 'widgets/calendar');

  calendarCall.start();
};
