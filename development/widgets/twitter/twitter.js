if (document.querySelector('.widget-twitter')) {
  var twitterRotator = new Carousel('.twitter-carousel');
  twitterRotator.interval(5000);

  var twitterCall = new Scheduler('.widget-twitter', function(data, status) {
    $('.widget-twitter').html(data);
    // Set up the array to rotate through again as the divs have changed
      twitterRotator.rotating = [];
      console.log(twitterRotator.rotating);
    //  twitterRotator.intervalLoop = false;
      document.querySelectorAll('.twitter-carousel').forEach(function(one) {
        twitterRotator.rotating.push(one);
      });
      console.log(twitterRotator.rotating);
      // Restart the carousel
    //  twitterRotator.interval(5000);
  }, 'widgets/twitter');

  twitterCall.start();

};
