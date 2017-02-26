if (document.getElementById('scatterChartDisplay')) {
  (function() {
    var scatterChart = new Chart('scatterChartDisplay', 'scatterChartData', 'dataChartScatter');
    scatterChart.scatterChart();
  }());
}
