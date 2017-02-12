// Jquery UI functions for widgets on dashboard page
$(function() {
  $("#sortable").sortable();
  $("#sortable").disableSelection();
});

$(function() {
  $("#sortable2").sortable();
  $("#sortable2").disableSelection();
});

// Dashboard select page

$('#pc-select').click(function() {
  $('.flex-widget-preview, .flex-widget-preview-double-width').addClass('pc-widget').removeClass('tv-widget');
  $('.flex-widget-preview-double-width').removeClass('tv-widget-double-width').addClass('pc-widget-double-width');
  $('.flex-wrapper-preview, .flex-wrapper-preview-two').addClass('pc-wrapper').removeClass('tv-wrapper');
});

$('#tv-select').click(function() {
  $('.flex-widget-preview').addClass('tv-widget').removeClass('pc-widget');
  $('.flex-widget-preview-double-width').addClass('tv-widget-double-width').removeClass('pc-widget-double-width');
  $('.flex-wrapper-preview, .flex-wrapper-preview-two').addClass('tv-wrapper').removeClass('pc-wrapper');
});

$('.select-radio').click(function() {
  $(this).parent().addClass('selected');
  $(this).parent().siblings().not($('legend')).removeClass('selected');
  $('#widget-select').fadeIn('slow');
});

$('input[type=checkbox]').change(function() {
  if ($(this).parent().hasClass('selected')) {
      $(this).parent().removeClass('selected');
    } else {
      $(this).parent().addClass('selected');
      $('#preview-submit').fadeIn('fast').removeClass('hidden');
    }
});

$('input[type=checkbox]').parent().mouseenter(function() {
  $(this).addClass('hovered');
}).mouseleave(function() {
  $(this).removeClass('hovered');
});

$('input[type=checkbox], input[type=radio]').focusin(function() {
  $(this).parent().addClass('focused');
}).focusout(function() {
  $(this).parent().removeClass('focused');
});

$('.select-checkbox').click(function() {
  var destination = $(".flex-wrapper-preview div:last");
  if ($('#previewPane').hasClass('hidden')) {
    $('#previewPane').removeClass('hidden');
  }
  if (($('#tv-select').parent().hasClass('selected') && ($('.flex-widget-preview.displayed').length + ($('.flex-widget-preview-double-width.displayed').length) * 2) >= 10) ||
      ($('#pc-select').parent().hasClass('selected') && ($('.flex-widget-preview.displayed').length + ($('.flex-widget-preview-double-width.displayed').length) * 2) >= 8) ||
      ($('#mobile-select').parent().hasClass('selected') && ($('.flex-widget-preview.displayed').length + ($('.flex-widget-preview-double-width.displayed').length) * 2) >= 1)) {
      destination = $(".flex-wrapper-preview-two div:last");
    if ($('.flex-wrapper-preview-two').hasClass('hidden')) {
      $('.flex-wrapper-preview-two').removeClass('hidden');
      $('#preview-breaker').fadeIn('slow').removeClass('hidden');
    }
  } else {
    $('.flex-wrapper-preview-two').addClass('hidden');
    $('#preview-breaker').fadeOut(1).addClass('hidden');
  }
  $('#' + $(this).data('target')).fadeIn('fast').removeClass('hidden').addClass('displayed');
  $('#' + $(this).data('target')).insertAfter(destination);
  if($(this).parent().hasClass('selected')) {
    $('#' + $(this).data('target')).fadeOut('fast').addClass('hidden').removeClass('displayed');
  }
});

$('#preview-submit').click(function() {
  var loadingMessages = ['Just getting your dashboards ready...', 'Parsing JSON...', 'I\'m thinking about it...', 'Loading...'];
  $('#dashboard-settings').addClass('hidden');
  $('#loadingMessages').fadeIn('slow').removeClass('hidden');
  $('#loadingMessage').text(loadingMessages[(Math.floor(Math.random() * (loadingMessages.length)))]);
});


// Dashboard page switch methods
function switchBoards() {
  $(".switcher").toggle('slide', function() {
  $('#secondBoard').toggleClass('hidden');
  });
}

// if ($('#secondBoard')) {
//   setInterval(switchBoards, 5000);
// }

function fadeBoards() {
  $(".switcher").fadeToggle('slow', function() {
  $('#secondBoard').fadeToggle('slow').toggleClass('hidden');
});
}

if (($('#sortable2').children().length) > 0) {
  setInterval(fadeBoards, 5000);
}
