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

// For badly styled checkboxes
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

// For the preview pane and setting order for dashboard page
var orderingObject = {};
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
  // and add to ordering orderingObject
  var size;
  if ($('#' + $(this).data('target')).hasClass('flex-widget-preview') && $('#' + $(this).data('target')).hasClass('displayed')) {
    size = 1;
  } else {
    size = 2;
  }
  orderingObject[$('.flex-widget-preview.displayed').length + $('.flex-widget-preview-double-width.displayed').length] = {
  widget: $(this).val(),
  size: size
};
  if($(this).parent().hasClass('selected')) {
    $('#' + $(this).data('target')).fadeOut('fast').addClass('hidden').removeClass('displayed');
  }
});

// To cover up longer loading times - Display a message
// Also pass the ordering object to the hidden field
$('#preview-submit').click(function() {
  $('#hiddenOrdering').val(JSON.stringify(orderingObject));
  var loadingMessages = ['Just getting your dashboards ready...', 'Parsing JSON...', 'Working on it...', 'Loading...'];
  $('#dashboard-settings, #settingsButton').addClass('hidden');
  $('#loadingMessages').fadeIn('slow').removeClass('hidden');
  $('#loadingMessage').text(loadingMessages[(Math.floor(Math.random() * (loadingMessages.length)))]);
});

// For settings menu
$('.switcher-button').click(function() {
  $('#dashboard-settings').addClass('hidden');
  $('#settingsButton').addClass('hidden');
  $('#settingsMenu').toggle('slide', {direction: 'right'}, 'slow');
});

$('.return-button').click(function() {
  $('#settingsMenu').toggle('slide', {direction: 'right'}, 'slow', function() {
  $('#dashboard-settings').removeClass('hidden');
  $('#settingsButton').removeClass('hidden');
  });
});


/// Set up settings for switch method then set up switch statement to
/// cover selected method

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
  // setInterval(fadeBoards, 5000);     // For a switch interval
window.addEventListener('click', fadeBoards);  // Or a click triggered interval
}


  // console.log('-----------------------------');
  //
  // $.post('calendar', function(data, status) {
  //   console.log(status);
  //   console.log(data);
  // });
  //
  // console.log('-----------------------------');

  // ajax calls for repeted requests

if (document.querySelector('#weatherOne')) {
  setInterval(function() {
    $.post('weather', function(data, status) {
      $('.icon-background-weather i').attr('class', 'wi wi-' + data[3]);
      $('.weather-city').text(data[1] + ' Weather');
      $('.weather-type').text(data[0]);
      $('.weather-temp').text(data[2] + '°C');
    });
  }, $('#callRate').val() || 300000);
}

if (document.querySelector('#xkcdOne')) {
  setInterval(function() {
    $.post('xkcd', function(data, status) {
      console.log(data);
      $('.xkcd-heading').html('XKCD: ' + data.num + '<br>' + data.safe_title);
      $('.xkcd-comic').attr('src', data.img);
    });
  }, $('#callRate').val() || 300000);
}

var testObject = {
  1 : {
    widget: 'weather',
    size: 2
  },
  2 : {
    widget: 'xkcd',
    size: 1
  },
  3: {
    widget: 'map',
    size: 1
  }
};

// ajax call to save favourites
$('#saveToFave').click(function() {
  $.post('save-fave', testObject)
    .done(function(data) {
      $('#savedMessage').text(data);
    });
});

$('#getFave').click(function() {
  $.post('retrieve-fave', function(data, status) {
      $('#retrievedData').text(data[1].widget);
      console.log(data[1].widget);
    });
});
