if (document.querySelector('#xkcdOne')) {
setInterval(function() {
  $.post('xkcd', function(data, status) {
    // $('.xkcd-heading').html('XKCD: ' + data.num + '<br>' + data.safe_title);
    // $('.xkcd-comic').attr('src', data.img);
  });
}, parseInt(document.getElementById('xkcdOne').dataset.rate));
};
