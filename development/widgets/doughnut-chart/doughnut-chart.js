if (document.getElementById('doughnutChartDisplay')) {
  (function() {
    var doughnutChart = new Chart('doughnutChartDisplay', 'doughnutChartData', 'dataChartDoughnut');
    doughnutChart.doughnutChart();
  }());
}
