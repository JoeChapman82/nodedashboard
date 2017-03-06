if (document.getElementById('progressMeterDisplay')) {
    var progressExample = new Progress('progressMeterDisplay', 'progressMeterData');
    progressExample.interval(50);

  var progInterval = setInterval(function() {
    // Don't make another request if window not active - It makes the other intervals stack
    if (document.hasFocus()) {
      var d = new Date();
      var m = d.getMinutes() < 10 ? '0' + d.getMinutes(): d.getMinutes();
      var s = d.getSeconds() < 10 ? '0' + d.getSeconds(): d.getSeconds();
      $.ajax({
        type: "POST",
        url: 'data-calls',
        data: {
          call: 'example-data-generator',
          reply: false,
          type: 'json'
        },
        success: function(data, status) {
          progressExample.progMetPercent = data.randomNumber;
          progressExample.interval(50);
          document.getElementById('progressTime').innerText = "Last updated at " + d.getHours() + ":"  + m + ":" + s;
        }
      });
    }
  }, parseInt(document.querySelector('.widget-progress').dataset.rate));
}
