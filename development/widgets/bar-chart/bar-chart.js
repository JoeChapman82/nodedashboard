if (document.getElementById('barCanvas')) {
  (function() {
    var myChart = new Chart('barCanvas', 'barDataDiv', 'barTable');
    myChart.interval(50);
  }());
}
