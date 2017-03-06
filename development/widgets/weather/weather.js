if (document.querySelector('.widget-weather')) {
  console.log('widget')
setInterval(function() {
$.ajax({
  type: "POST",
  url: 'data-calls',
  data: {
    call: 'weather',
    reply: 'widgets/weather',
    type: 'html'
      },
  success: function(data, status) {
    $('.widget-weather').html(data);
    console.log(data);
    // $('.icon-background-weather i').attr('class', 'wi wi-' + data.weather[0].icon);
    // $('.weather-city').text(data.name + ' Weather');
    // $('.weather-type').text(data.weather[0].main);
    // $('.weather-temp').text(data.main.temp + '°C');
  }
});
}, parseInt(document.querySelector('.widget-weather').dataset.rate));
};
