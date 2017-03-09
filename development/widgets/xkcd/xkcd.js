if (document.querySelector('.widget-xkcd')) {

var xkcdCall = new Scheduler('.widget-xkcd', function(data, status) {
  $('.xkcd-heading').html('XKCD: ' + data.num + '<br>' + data.safe_title);
  $('.xkcd-comic').attr('src', data.img);
});

xkcdCall.start();

};
