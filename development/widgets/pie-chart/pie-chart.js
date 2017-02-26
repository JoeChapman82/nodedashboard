if (document.getElementById('pieChartDisplay')) {
  (function() {
    var pieChart = new Chart('pieChartDisplay', 'pieChartData', 'dataChartPie');
    pieChart.pieChart();
  }());
}
