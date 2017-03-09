if (document.querySelector('.widget-weather')) {

var weatherCall = new Scheduler('.widget-weather', function(data, status) {
  $('.widget-weather').html(data);
}, 'widgets/weather');

weatherCall.start();

};
