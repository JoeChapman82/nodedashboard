if (document.getElementById('progressMeterDisplay')) {
    var progressExample = new Progress('progressMeterDisplay', 'progressMeterData');
    progressExample.interval(50);

var progressCall = new Scheduler('.widget-progress', function(data, status) {
  progressExample.progMetPercent = data.randomNumber;
  progressExample.interval(50);
  document.getElementById('progressTime').innerText = getUpdatedTime();
});

progressCall.start();

}
