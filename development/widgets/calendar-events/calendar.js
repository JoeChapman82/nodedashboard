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
