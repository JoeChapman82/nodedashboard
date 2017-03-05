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
