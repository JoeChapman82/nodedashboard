// Jquery UI functions for widgets on dashboard page
// TODO - use plain js instead - addclass to all div children,  addEventListener down/up
// add placeholder for element to drop back to if not repositioned,
// Gather all potitions, apply position relative to mouse pointer
// Rearrange on mouse up
$(function() {
  $(".sortable").sortable();
  $(".sortable").disableSelection();
});

document.querySelectorAll('input[type="checkbox"], input[type="radio"], button').forEach(function(input){
  input.addEventListener('focus', function() {
    this.parentNode.classList.add('focused');
  });
  input.addEventListener('blur', function() {
    this.parentNode.classList.remove('focused');
  });
});

// Dashboard select page
//Change this to generic click / data target function
if (document.querySelector('#favouritesButton')) {
  document.querySelector('#favouritesButton').onclick = function() {
  document.getElementById(this.dataset.target).classList.remove('hidden');
  this.classList.add('hidden');
};

  document.getElementById('closeFave').onclick = function() {
    document.getElementById('faveWrapper').classList.add('hidden');
    document.querySelector('#favouritesButton').classList.remove('hidden');
  };
}

  // main menu
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

// For the preview pane and setting order for dashboard page
var orderingObject = {};
var sizeCounter = 0;
$('.select-checkbox').click(function() {
  // Clear the disabled buttons if any
  document.querySelectorAll('.select-checkbox').forEach(function(checkbox) {
    if (checkbox.parentNode.classList.contains('disabled')) {
      checkbox.parentNode.classList.remove('disabled');
      checkbox.disabled = false;
    }
  });

  // Remove from preview if already selected
    if($(this).parent().hasClass('selected')) {
      var i = 1;
      $('#' + $(this).data('target')).fadeOut('fast').addClass('hidden').removeClass('displayed');
      sizeCounter -= parseInt($('#' + $(this).data('target')).data('width'));
      // delete orderingObject[$('#' + $(this).data('target')).data('position')];
      // console.log(orderingObject);
      // Object.keys(orderingObject).forEach(function(key) {
      //   console.log(key);
      //   orderingObject[i] = orderingObject[key];
      //   i++;
      // });
    } else {

  // TODO clear selection when switching between pc and tv
  var display = document.getElementById('pc-select').checked ? 'pc' : 'tv';
  var maxsize = display === 'pc' ? 8 : 10;
  // Change the preview wrapper based in display selection - TODO - move this
  document.querySelector('#' + this.dataset.target).classList.add('flex-widget-preview-' + display + '-' + document.querySelector('#' + this.dataset.target).dataset.width);
  document.querySelectorAll(['.flex-wrapper-preview', '.flex-wrapper-preview-two', '.flex-wrapper-preview-three', '.flex-wrapper-preview-four']).forEach(function(wrapper){
    if (!wrapper.classList.contains(display + '-wrapper')) {
      wrapper.classList.add(display + '-wrapper');
    }
  });
  // TODO - Temp solution - make better when time - add max size var tied to preview wrappers displayed & display var
  var destination = $(".flex-wrapper-preview div:last");
  if (document.getElementById('previewPane').classList.contains('hidden')) {
    document.getElementById('previewPane').classList.remove('hidden');
    document.querySelector('.flex-wrapper-preview').classList.remove('hidden');
    document.querySelector('.flex-wrapper-preview').classList.add('displayed');
  }
  if ((display === 'tv' && sizeCounter >= 30) || (display === 'pc' && sizeCounter >= 24)) {
      destination = $(".flex-wrapper-preview-four div:last");
    if ($('.flex-wrapper-preview-four').hasClass('hidden')) {
        $('.flex-wrapper-preview-four').removeClass('hidden').addClass('displayed');
        $('#preview-breaker-two').fadeIn('slow').removeClass('hidden');
    }
  } else if ((display === 'tv' && sizeCounter >= 20) || (display === 'pc' && sizeCounter >= 16)) {
      destination = $(".flex-wrapper-preview-three div:last");
    if ($('.flex-wrapper-preview-three').hasClass('hidden')) {
      $('.flex-wrapper-preview-three').removeClass('hidden').addClass('displayed');
    }
  } else if ((display === 'tv' && sizeCounter >= 10) || (display === 'pc' && sizeCounter >= 8)) {
      destination = $(".flex-wrapper-preview-two div:last");
    if ($('.flex-wrapper-preview-two').hasClass('hidden')) {
      $('.flex-wrapper-preview-two').removeClass('hidden').addClass('displayed');
      $('#preview-breaker').fadeIn('slow').removeClass('hidden');
    }
  }
  $('#' + $(this).data('target')).fadeIn('fast').removeClass('hidden').addClass('displayed');
  $('#' + $(this).data('target')).insertAfter(destination);
  // Change the dataset-position of the selected element
  var placedWidget = document.getElementById(this.dataset.target);
  var displayedLength = document.querySelectorAll('.flex-widget-preview-' + display + '-1.displayed').length + document.querySelectorAll('.flex-widget-preview-' + display + '-2.displayed').length + document.querySelectorAll('.flex-widget-preview-' + display + '-3.displayed').length + $('.flex-widget-preview-' + display + '-4.displayed').length;
  var displayedPreviews = document.querySelectorAll('div[class^="flex-wrapper-preview"].displayed').length;
  placedWidget.dataset.position = displayedLength;
  // and add to ordering orderingObject
  orderingObject[placedWidget.dataset.position] = {
  widget: $(this).val(),
  size: placedWidget.dataset.width,
  display: display,
  height: placedWidget.dataset.height,
  position: placedWidget.dataset.position,
  dataCaller: placedWidget.dataset.caller,
  dataRate: placedWidget.dataset.rate,
  dataCallTo: placedWidget.dataset.call,
  style: placedWidget.dataset.style
};
sizeCounter += parseInt(placedWidget.dataset.width) * parseInt(placedWidget.dataset.height);

} // end of else statement for non disabled checkboxes

// Disable selection of buttons for that won't fit
document.querySelectorAll('.select-checkbox').forEach(function(checkbox) {
  var widthOfOption = parseInt(document.getElementById(checkbox.dataset.target).dataset.width);
  if (((widthOfOption + sizeCounter) - (maxsize * (displayedPreviews - 1)) > maxsize && (sizeCounter - (maxsize * (displayedPreviews - 1)) < maxsize)) ||
     ((widthOfOption + sizeCounter) - (maxsize * (displayedPreviews - 1)) > maxsize / 2) && (sizeCounter - (maxsize * (displayedPreviews - 1)) < maxsize / 2)) {
    if (!checkbox.checked) {
    checkbox.parentNode.classList.add('disabled');
    checkbox.disabled = true;
    }
  }
});

});

// To cover up longer loading times - Display a message
// Also pass the ordering object to the hidden field
$('#preview-submit').click(function() {
  $('#hiddenOrdering').val(JSON.stringify(orderingObject));
  var loadingMessages = ['Just getting your dashboards ready...', 'Parsing JSON...', 'Working on it...', 'Loading...'];
  $('#dashboard-settings, #settingsButton, #favouritesButton').addClass('hidden');
  $('#loadingMessages').fadeIn('slow').removeClass('hidden');
  $('#loadingMessage').text(loadingMessages[(Math.floor(Math.random() * (loadingMessages.length)))]);
});

// For settings menu
$('.switcher-button').click(function() {
  $('#dashboard-settings, #settingsButton').addClass('hidden');
  $('#settingsMenu').fadeIn('slow');
  document.querySelector('.favourites-wrapper').classList.add('hidden');
});

$('.return-button').click(function() {
  $('#settingsMenu').fadeOut('slow', function() {
  $('#dashboard-settings, #settingsButton').removeClass('hidden');
  document.querySelector('.favourites-wrapper').classList.remove('hidden');
  });
});

// Settings Tabs
document.querySelectorAll('button.settings-tab-button').forEach(function(tab) {
  tab.onclick = function() {
    document.querySelectorAll('button.settings-tab-button').forEach(function(t) {
      if (t.classList.contains('current-tab')) {
      t.classList.remove('current-tab');
      document.getElementById(t.dataset.target).classList.add('hidden');
    }
    });
    this.classList.add('current-tab');
    document.getElementById(this.dataset.target).classList.remove('hidden');
  };
});

// Reassign sizes and call rates
if (document.getElementById('settingsMenu')) {
(function() {

function reassignValues(toUpdate, targetPoint, multiply) {
    document.querySelectorAll(toUpdate).forEach(function(output) {
      document.querySelector('#' + output.dataset.target).dataset[targetPoint] = output.value * multiply;
    });
  }

  document.querySelector('#updateSizes').onclick = function() {
    reassignValues('.width-input', 'width', 1);
    reassignValues('.height-input', 'height', 1);
    this.classList.add('clicked');
    document.getElementById('updateSizeMessage').classList.remove('hidden');
    setTimeout(function() {
      document.getElementById('updateSizes').classList.remove('clicked');
      document.getElementById('updateSizeMessage').classList.add('hidden');
    }, 3000);
  };

  document.querySelector('#updateCallRate').onclick = function() {
    reassignValues('.call-rate-input', 'rate', 60000);
    this.classList.add('clicked');
    document.getElementById('updateRateMessage').classList.remove('hidden');
    setTimeout(function() {
      document.getElementById('updateCallRate').classList.remove('clicked');
      document.getElementById('updateRateMessage').classList.add('hidden');
    }, 3000);
  };

document.querySelectorAll('.settings-input-radio').forEach(function(input) {
  input.onclick = function() {
    this.parentNode.parentNode.childNodes.forEach(function(label) {
      if (typeof label.classList !== 'undefined') {
      label.classList.remove('selected');
    }
    });
    this.parentNode.classList.add('selected');
  };
});

}());


// Settings image preview
document.querySelectorAll('.st-input').forEach(function(item) {
  item.onclick = function() {
    var clickedValue = this.value;
    this.parentNode.parentNode.childNodes.forEach(function(label) {
      if (typeof label.classList !== 'undefined' && label.classList.contains('st-type')) {
        label.classList.remove('selected');
      }
    });
    document.querySelector('#' + this.dataset.target).parentNode.childNodes.forEach(function(child) {
      if (typeof child.classList !== 'undefined') {
        child.classList.add('hidden');
      }
    });
    // Update the styles
    document.querySelector('#' + this.dataset.target).classList.remove('hidden');
    this.parentNode.classList.add('selected');
    document.querySelectorAll('div[id$="-preview"]').forEach(function(previewWidget) {
      if (typeof previewWidget.dataset.style !== 'undefined') {
         previewWidget.dataset.style = clickedValue;
      }
    });
  };
});

}
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
  var boardsToDisplay = [];
  document.querySelectorAll('.sortable').forEach(function(board) {
    if (board.childNodes.length > 1) {
      boardsToDisplay.push(board.parentNode);
    }
  });
  boardsToDisplay.every(function(board, index) {
    if (!board.classList.contains('hidden')) {
        $(board).fadeOut('2000', function() {
        board.classList.add('hidden');
      });
      if (index === boardsToDisplay.length - 1) {
        $(boardsToDisplay[0]).fadeIn('2000', function() {
          boardsToDisplay[0].classList.remove('hidden');
      });
        return false;
      } else {
        $(boardsToDisplay[index + 1]).fadeIn('2000', function() {
        boardsToDisplay[index + 1].classList.remove('hidden');
      });
        return false;
      }
    } else {
      return true;
    }
  });
}

  // $(".switcher").fadeToggle('slow', function() {
  // $('#secondBoard').fadeToggle('slow').toggleClass('hidden');
// });


if (($('#secondBoard').children().length) > 0) {
  // setInterval(fadeBoards, 5000);     // For a switch interval
window.addEventListener('click', fadeBoards);  // Or a click triggered interval
}

if (document.querySelector('.sortable') && !document.querySelector('#loadedDashboard')) {
  var showMessage = true;
  var orderObject = {};
  var allWidgets = document.querySelectorAll('div[class^="flex-widget-"]');
  // Add event to widgets to trigger save message after moving
  allWidgets.forEach(function(item) {
    item.addEventListener('mouseup', saveOrder);
  });
// Do save
document.getElementById('saveYes').onclick = function() {
  document.getElementById('saveName').classList.remove('hidden');
};
document.getElementById('sendData').onclick = function() {
  // Make an object
  allWidgets.forEach(function(widget) {
    // change to position
    orderObject[parseInt(widget.dataset.position)] = {
      widget: widget.dataset.widget,
      size: widget.dataset.size,
      display: widget.dataset.display,
      dataRate: widget.dataset.rate,
      dataCallTo: widget.dataset.call,
      style: widget.dataset.style
    };
  });
  // Save order to favourites
  $.post('save-fave', {ordering: JSON.stringify(orderObject), name: document.getElementById('name').value})
    .done(function(data) {
      $('#savedMessage').text(data);
        setTimeout(function() {
          document.getElementById('saveIt').classList.add('hidden');
        }, 3000);
    //  showMessage = false; // Changed for demo - Should check for success
    });
    window.addEventListener('click', fadeBoards); // Remember to this out
};
// Don't save
document.getElementById('saveNo').onclick = function() {
  document.getElementById('saveIt').classList.add('hidden');
  window.addEventListener('click', fadeBoards); // Remember to this out
};
// Stop showing message
document.getElementById('saveStop').onclick = function() {
  showMessage = false;
  document.getElementById('saveIt').classList.add('hidden');
  window.addEventListener('click', fadeBoards); // Remember to this out
};
}

function saveOrder() {
  if (showMessage === true) {
    window.removeEventListener('click', fadeBoards); // Remember to take this out
    setTimeout(function() {
  // Save the order - Find divs with classes starting with (class^ = startingwith, class$ = ending with, class* = containing )
  var allWidgets = document.querySelectorAll('div[class^="flex-widget-"]');
  for (var i = 0; i < allWidgets.length; i++) {
    allWidgets[i].dataset.position = i + 1;
  }
    document.getElementById('saveIt').classList.remove('hidden');
    }, 1000);
  }
}

// ajax call to retrieve favourites
$('#getFave').click(function() {
  $.post('retrieve-fave', function(data, status) {
      $('#retrievedData').text(data[1].widget);
    });
});
