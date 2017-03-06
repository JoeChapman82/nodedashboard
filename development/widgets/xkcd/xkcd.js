if (document.querySelector('.widget-xkcd')) {
setInterval(function() {
$.ajax({
  type: "POST",
  url: 'data-calls',
  data:  {
      call: 'xkcd',
      reply: false,
      type: 'json'
        },
  success: function(data, status) {
    console.log(data);
  //  $('.widget-xkcd').html(data);
    $('.xkcd-heading').html('XKCD: ' + data.num + '<br>' + data.safe_title);
    $('.xkcd-comic').attr('src', data.img);
  }
});
}, parseInt(document.querySelector('.widget-xkcd').dataset.rate));
};
