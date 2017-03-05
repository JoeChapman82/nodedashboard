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
