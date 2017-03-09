// Canvas - The id of the <canvas>
// labels - The id of the <div> with data attributes
// data - The id of the data <table>
// pass js objects - no jquery

// TODO - Need setters and getters for updating charts - same for meters

"use strict";

function Chart(canvas, labels, data) {
  var self = this;

// amend the height attached to canvas element for tv displays (to account for different aspect ratio)
  if (document.getElementById(canvas).parentElement.classList.contains('flex-widget-tv-1') || document.getElementById(canvas).parentElement.classList.contains('flex-widget-tv-2')) {
    document.getElementById(canvas).setAttribute('height', '430');
  }

  this.canvas = {
    width: document.getElementById(canvas).width,
    height: document.getElementById(canvas).height,
    marginSmall: document.getElementById(canvas).width / 30,
    margin: document.getElementById(canvas).width / 10,
    padding: document.getElementById(canvas).width / 120,
  };
  this.labels = {
    title: document.getElementById(labels).getAttribute('data-title'),
    x: document.getElementById(labels).getAttribute('data-x'),
    y: document.getElementById(labels).getAttribute('data-y')
  };
  this.data = document.getElementById(data);
  this.ctx = document.getElementById(canvas).getContext('2d');
  this.colours = ['rgba(70, 130, 180, 1)', 'rgba(71, 187, 179, 1)', 'rgba(236, 102, 60, 1)', 'rgba(220, 89, 69, 1)', 'rgba(6, 111, 154, 1)', 'rgba(0, 128, 128, 1)', 'blue', 'pink'];
  // Take the data from the hidden table and put it in an array
  this.dataArrayFull = [];
  (function() {
    document.querySelectorAll('#' + self.data.id + ' td').forEach(function(element) {
      var item = element.innerHTML;
      self.dataArrayFull.push(item);
    });
  }());
  // Seperate the data array into x and y columns converting strings to numbers where necessary
  this.numbersArray = (function() {
    var loopIndex = 0;
    var  arrForSum = [];
    self.dataArrayFull.forEach(function(member) {
    if (loopIndex % 2 !== 0) {
      arrForSum.push(parseFloat(member));
    }
    loopIndex++;
    });
    return arrForSum;
  }());
  this.itemsArray = (function() {
    var loopIndex = 0;
    var  arrForSum = [];
    self.dataArrayFull.forEach(function(member) {
    if (loopIndex % 2 === 0) {
      if ($.isNumeric(member)) {     // TODO Need to change this to not use jQuery
        arrForSum.push(parseFloat(member));
      } else {
      arrForSum.push(member);
    }
    }
    loopIndex++;
    });
    return arrForSum;
  }());
  // Calculate the highest value for x and y axis
  this.highestPointY = Math.max(Math.max.apply(Math, this.numbersArray));
  this.yPeak = Math.ceil(this.highestPointY / Math.pow(10, this.highestPointY.toString().length)) * Math.pow(10, this.highestPointY.toString().length);
  if (this.highestPointY.toString()[0] < 5) {
    this.yPeak /= 2;
  }
  this.highestPointX = Math.max(Math.max.apply(Math, this.itemsArray));
  this.xPeak = Math.ceil(this.highestPointX / Math.pow(10, this.highestPointX.toString().length)) * Math.pow(10, this.highestPointX.toString().length);
  if (this.highestPointX.toString()[0] < 5) {
    this.xPeak /= 2;
  }
  // And the total value of the numbers array for Pie and Doughnut Charts
  this.totalNumbersArray = this.numbersArray.reduce(add, 0);
  function add(a, b) {
    return a + b;
  }
  // Set Columns for Barchart
  this.columnNumber = this.numbersArray.length;
  this.columnWidth = ((this.canvas.width - 2 * this.canvas.marginSmall) - ((this.columnNumber - 2) * this.canvas.padding)) / this.columnNumber;
  // Relative points for Bar Charts
  // Where a realtive point is equal to the value along the axis of 1 point of the values in an array
  this.relativePointY = (this.canvas.height - 2 * this.canvas.marginSmall) / this.yPeak;
  this.relativePointX = (this.canvas.height - 2 * this.canvas.marginSmall) / this.xPeak;
  // Relative points for Scatter Charts
  this.relativePointXScatter = (this.canvas.width - 2 * this.canvas.margin) / this.xPeak;
  this.relativePointYScatter = (this.canvas.height - 2 * this.canvas.margin) / this.yPeak;
  // Relative points for Pie and Doughnut Charts (relative radian - not actual radian value - still need * Math.PI)
  this.relativePercent = 100 / this.totalNumbersArray;
  this.relativeRadian = 2 / this.totalNumbersArray;
  // Animation set up for Bar Charts
  this.animateArray = [];
  this.numbersArray.forEach(function() {
    self.animateArray.push(0);
  });
  // Amount of notches on each axis
  this.markers = 5;
  this.intervalLoop = false;
}

/*****************

General functions relavant to multiple charts

******************/

Chart.prototype.drawTitle = function() {
  this.ctx.font = "bold 18px Arial";
  this.ctx.textAlign = 'center';
  this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
  this.ctx.fillText(this.labels.title, this.canvas.width / 2, 20);
};

/*****************

Functions for Bar Charts

******************/

// draw columns, labels and data points
Chart.prototype.drawBarChart = function() {
  var colourPicker = 0;
  for (var i = 0; i < this.columnNumber; i++) {
    this.ctx.beginPath();
    this.ctx.lineWidth = "0.5";
    this.ctx.strokeStyle = "dark-grey";
    var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, this.canvas.height * 0.25);
    grd.addColorStop(0,"white");
    grd.addColorStop(1, this.colours[colourPicker]);
    this.ctx.rect(this.canvas.marginSmall + (i * this.columnWidth) + ((i - 1) * this.canvas.padding), (this.canvas.height - this.canvas.marginSmall) - (this.animateArray[i] * this.relativePointY), this.columnWidth, this.animateArray[i] * this.relativePointY);
    this.ctx.fillStyle = grd;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.ctx.fillText(this.itemsArray[i], this.canvas.marginSmall + (i  * this.columnWidth) + ((i - 1) * this.canvas.padding) + (this.columnWidth / 2), this.canvas.height - this.canvas.marginSmall + 16, this.columnWidth);
    if (this.animateArray[i] > this.yPeak / 10) {
      this.ctx.fillText(this.animateArray[i], this.canvas.marginSmall + (i  * this.columnWidth) + ((i - 1) * this.canvas.padding) + (this.columnWidth / 2), (this.canvas.height - this.canvas.marginSmall) - (this.animateArray[i] * this.relativePointY) + 16, this.columnWidth);
    } else {
      this.ctx.fillText(this.animateArray[i], this.canvas.marginSmall + (i  * this.columnWidth) + ((i - 1) * this.canvas.padding) + (this.columnWidth / 2), (this.canvas.height - this.canvas.marginSmall) - (this.animateArray[i] * this.relativePointY) - this.canvas.padding, this.columnWidth);
    }
    this.ctx.closePath();
    // return to begining of colours array if length exceeded
    colourPicker++;
    if (colourPicker > this.colours.length - 1) {
      colourPicker = 0;
    }
  }
};

  Chart.prototype.mainBarChartDraw = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawTitle();
    this.drawBarChart();
    for (var i = 0; i < this.animateArray.length; i++) {
      if (this.numbersArray[i] - this.animateArray[i] > 10000) {
        this.animateArray[i] += 1000;
      } else if (this.numbersArray[i] - this.animateArray[i] > 1000) {
        this.animateArray[i] += 100;
      } else if (this.numbersArray[i] - this.animateArray[i] > 100) {
        this.animateArray[i] += 10;
      } else if (this.animateArray[i] < this.numbersArray[i]) {
        this.animateArray[i]++;
      }
        if (this.animateArray[i] >= this.highestPointY) {
          clearInterval(this.intervalLoop);
        }
    }
  };

  Chart.prototype.interval = function(interval) {
    var self = this;
    this.intervalLoop = setInterval(function() {
      self.mainBarChartDraw();
    }, interval);
  };


  /*****************

  Functions for Scatter Charts

  ******************/

  Chart.prototype.drawAxis = function () {
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.margin, this.canvas.height - this.canvas.margin);
    this.ctx.lineTo(this.canvas.margin, this.canvas.margin);
    this.ctx.moveTo(this.canvas.margin, this.canvas.height - this.canvas.margin);
    this.ctx.lineTo(this.canvas.width - this.canvas.margin,this.canvas.height - this.canvas.margin);
    this.ctx.stroke();
    // confusing rotate and restore for veritcal text
    this.ctx.save();
    this.ctx.translate(this.canvas.width, this.canvas.height);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.labels.y, this.canvas.height / 2, -this.canvas.width + this.canvas.margin / 2);
    this.ctx.restore();
    this.ctx.fillText(this.labels.x, this.canvas.width / 2, this.canvas.height - 4); //Height minus quart font size to stop tails disappearing
    this.ctx.closePath();
  };

  Chart.prototype.drawMarkers = function () {
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = 'center';
    this.ctx.fillText('0', this.canvas.margin - 6, (this.canvas.height - this.canvas.margin) + 12);
    for (var i = 1; i < this.markers + 1; i++) {
      this.ctx.textAlign = 'start';
      this.ctx.fillText(this.xPeak / this.markers * i, (this.canvas.width - (2 * this.canvas.margin)) / this.markers * i, (this.canvas.height - this.canvas.margin) + 12); // this is wrong. Last number should start at end of x axis
      this.ctx.fillText(this.yPeak / this.markers * i, this.canvas.margin / 2, this.canvas.margin + (this.canvas.height - (2 * this.canvas.margin)) / this.markers * (this.markers - i));
    }
  };

  Chart.prototype.drawChartPoints = function() {
    for (var i = 0; i < this.itemsArray.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.margin + this.itemsArray[i] * this.relativePointXScatter, (this.canvas.height - this.canvas.margin) - (this.numbersArray[i] * this.relativePointYScatter), 5, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fillStyle ='rgba(70, 130, 180, 1)';
      this.ctx.fill();
      this.ctx.closePath();
    }
  };

  Chart.prototype.scatterChart = function() {
    this.drawTitle();
    this.drawAxis();
    this.drawMarkers();
    this.drawChartPoints();
  };

  /*****************

  Functions for Pie and Doughtnut Charts

  ******************/

  // Draw pie chart background-color
  Chart.prototype.drawPieOutline = function() {
  this.ctx.beginPath();
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = "black";
  this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2 - (2 * this.canvas.marginSmall), (this.canvas.width - (2 * this.canvas.marginSmall)) / 2, 0 * Math.PI, 2 * Math.PI);
  this.ctx.stroke();
  this.ctx.fillStyle = "grey";
  this.ctx.fill();
  this.ctx.closePath();
};

  // Now draw pie
  Chart.prototype.drawPie = function() {
    var self = this;
    var progress = 0; // for calculating distances round cirlce in radians
    var colourIndex = 0;
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "black";
      this.numbersArray.forEach(function(section) {
      self.ctx.beginPath();
      self.ctx.moveTo(self.canvas.width / 2, self.canvas.height / 2 - (2 * self.canvas.marginSmall));
      self.ctx.arc(self.canvas.width / 2, self.canvas.height / 2 - (2 * self.canvas.marginSmall), (self.canvas.width - (2 * self.canvas.marginSmall)) / 2, progress * Math.PI, (progress + (section * self.relativeRadian)) * Math.PI);
      self.ctx.lineTo(self.canvas.width / 2, self.canvas.height / 2 - (2 * self.canvas.marginSmall));
      self.ctx.stroke();
      self.ctx.fillStyle = self.colours[colourIndex];
      self.ctx.fill();
      self.ctx.closePath();
      progress += section * self.relativeRadian;
      colourIndex++;
      if (colourIndex === self.colours.length) {
        colourIndex = 0;
      }
    });
  };

  Chart.prototype.drawPieKey = function() {
    var self = this;
    var loopIndex = 0;
    var breakSpace = 0;
    var newLines = 0;
    this.itemsArray.forEach(function(item) {
      self.ctx.beginPath();
      self.ctx.rect(self.canvas.marginSmall / 2 + breakSpace, self.canvas.height * 0.85 - newLines, 12, 12);
      self.ctx.strokeStyle = "black";
      self.ctx.stroke();
      self.ctx.fillStyle = self.colours[loopIndex];
      self.ctx.fill();
      self.ctx.font = "12px Arial";
      self.ctx.textAlign = 'left';
      self.ctx.textBaseline = "top";
      self.ctx.fillStyle = "rgba(0, 0, 0, 1)";
      self.ctx.fillText(item, self.canvas.marginSmall / 2 + breakSpace + 15, self.canvas.height * 0.85 - newLines);
      self.ctx.closePath();
      loopIndex++;
      breakSpace += self.canvas.width / 4;
      if (loopIndex > self.colours.length) {
        loopIndex = 0;
      }
      if (loopIndex === 4) {
        newLines -= 25;
        breakSpace = 0;
      }
    });
  };

  Chart.prototype.pieChart = function() {
    this.drawTitle();
    this.drawPieOutline();
    this.drawPie();
    this.drawPieKey();
  };

  /*****************

  Function for drawing the hole in the Doughnut Chart

  ******************/

  Chart.prototype.drawDoughnutHole = function() {
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2 - (2 * this.canvas.marginSmall), (this.canvas.width - (2 * this.canvas.marginSmall)) / 4, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fillStyle = "#808080";
    this.ctx.fill();
    this.ctx.closePath();
  };

  Chart.prototype.doughnutChart = function() {
    this.drawTitle();
    this.drawPieOutline();
    this.drawPie();
    this.drawPieKey();
    this.drawDoughnutHole();
  };

function Progress(canvas, data) {

  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.percentInc = 0;
  this.progMetData = document.getElementById(data);
  this.progMetPercent = this.progMetData.getAttribute('data-percent');
  this.intervalLoop = false;
  }

Progress.prototype.drawProgressShadow = function() {
this.ctx.beginPath();
this.ctx.arc(100, 100, 80, 0.75 * Math.PI, 0.25 * Math.PI, false);
this.ctx.strokeStyle = 'grey';
this.ctx.lineCap = 'butt';
this.ctx.lineWidth = 35;
this.ctx.stroke();
this.ctx.closePath();
};

Progress.prototype.drawProgress = function() {
this.ctx.beginPath();
this.ctx.arc(100, 100, 80, 0.75 * Math.PI, (this.drawPercent()) * Math.PI, false);
this.ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
this.ctx.lineCap = 'butt';
this.ctx.lineWidth = 35;
this.ctx.stroke();
this.ctx.font = "bold 40px Arial";
this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
  if (this.percentInc < 10) {
    this.ctx.fillText(this.percentInc + "%", 69, 115);
  } else if (this.percentInc === 100) {
    this.ctx.fillText(this.percentInc + "%", 52, 115);
  } else {
    this.ctx.fillText(this.percentInc + "%", 62, 115);
  }
this.ctx.closePath();
};

// Because the arc starts at an odd angle and I didn't think to rotate it to make the maths easier :(
Progress.prototype.drawPercent = function() {
  if (this.percentInc <= 83) {
    return 0.75 + this.percentInc * 0.015;
  } else {
    return 0.25 - (100 - this.percentInc) * 0.0138;
  }
};

Progress.prototype.mainDraw = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.drawProgressShadow();
  this.drawProgress();
  this.percentInc++;
  if (this.percentInc > this.progMetPercent) {
  this.finish();
  }
};

Progress.prototype.finish = function() {
  clearInterval(this.intervalLoop);
  this.percentInc = 0;
};

Progress.prototype.interval = function(interval) {
  var self = this;
  this.intervalLoop = setInterval(function() {
    self.mainDraw();
  }, interval);
};

// Scheduler
// Gives json responses by default

// widgetClass -  string, the class selector for your widget - eg '.widget-yourchosenname',
// onSuccess - function(data, success){ what to do with the returned data };
// returnedTemplate - only required for 'template rendering responses'
      //  - string, the path to the template youd like rendering (it should join - nunjucks/partials/)

function Scheduler(widgetClassSelector, onSuccess, returnedTemplate) {
    var self = this;
    this.widget = widgetClassSelector;
    this.dataType = returnedTemplate ? 'html' : 'json';
    this.callTo = document.querySelector(this.widget).dataset.call;
    this.success = onSuccess;
    this.reply = returnedTemplate || false;
  }

  Scheduler.prototype.start = function() {
    var self = this;
    setInterval(function() {
      if (document.hasFocus()) {
          $.ajax({
            type: "POST",
            url: 'data-calls',
            data: {
              call: self.callTo,
              reply: self.reply,
              type: self.dataType
            },
            success: self.success
        });
      }
    }, parseInt(document.querySelector(this.widget).dataset.rate));
  };

// TODO should this just be passed in with the data object

  function getUpdatedTime() {
    var d = new Date();
    var m = d.getMinutes() < 10 ? '0' + d.getMinutes(): d.getMinutes();
    var s = d.getSeconds() < 10 ? '0' + d.getSeconds(): d.getSeconds();
    return "Last updated at " + d.getHours() + ":"  + m + ":" + s;
  };

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

// TODO - redo this
if (document.getElementById("clock"))
(function() {
function setTime() {

var canvas = document.getElementById("clock");
var context = canvas.getContext("2d");
var clockRadius = canvas.width / 2;

context.beginPath();

context.fillStyle = "grey";
context.arc(clockRadius, clockRadius, clockRadius, 0, 2*Math.PI);
context.fill();

context.fillStyle = "white";

context.beginPath();
context.arc(clockRadius, clockRadius, 10, 0, 2*Math.PI);
context.fill();

context.font = clockRadius / 10 + "px arial";
context.textAlign = "center";
context.textBaseline = "middle";

for (var i = 1; i <= 12; i++) {

    context.fillText(i, clockRadius + clockRadius * 0.9 * Math.sin(i * 2*Math.PI / 12), clockRadius - (clockRadius * 0.9 * Math.cos(i * 2 * Math.PI / 12)));

}


var hours = new Date().getHours();
var minutes = new Date().getMinutes();
var seconds = new Date().getSeconds();

var fullHours = hours % 12 + minutes / 60 + seconds / 3600;

var hoursAngle = fullHours * 2 * Math.PI / 12;
var minutesAngle = minutes * 2 * Math.PI / 60;
var secondsAngle = seconds * 2 * Math.PI / 60;

context.strokeStyle = "white";
context.moveTo(clockRadius, clockRadius);
context.lineTo(clockRadius + clockRadius * 0.6 * Math.sin(hoursAngle), clockRadius - (clockRadius * 0.6 * Math.cos(hoursAngle)));
context.lineWidth = 5;
context.stroke();

context.moveTo(clockRadius, clockRadius);
context.lineTo(clockRadius + clockRadius * 0.8 * Math.sin(minutesAngle), clockRadius - (clockRadius * 0.8 * Math.cos(minutesAngle)));
context.lineWidth = 3;
context.stroke();

context.moveTo(clockRadius, clockRadius);
context.lineTo(clockRadius + clockRadius * 0.9 * Math.sin(secondsAngle), clockRadius - (clockRadius * 0.9 * Math.cos(secondsAngle)));
context.lineWidth = 2;
context.stroke();

}

setInterval(setTime, 1000);

}());

if (document.querySelector('.widget-calendar')) {

  var calendarCall = new Scheduler('.widget-calendar', function(data, status) {
    $('.widget-calendar').html(data);
  }, 'widgets/calendar');

  calendarCall.start();
};

function countdown() {
var d = new Date($('#countdownDueDate').text()); // Format '25-Feb-2017 00:00:00'
var todaysDate = new Date();
var difDate = new Date(d - todaysDate);
var daysLeft = Math.floor(difDate/86400000);
var hoursLeft = difDate.getHours();
var minutesLeft = difDate.getMinutes() < 10 ? '0' + difDate.getMinutes() : difDate.getMinutes();
var secondsLeft = difDate.getSeconds() < 10 ? '0' + difDate.getSeconds() : difDate.getSeconds();
// if (secondsLeft < 10) {
//   secondsLeft = '0' + secondsLeft;
// }
// if (minutesLeft < 10) {
//   minutesLeft = '0' + minutesLeft;
// }

if (daysLeft >= 0) {
$('#countdownTimerDays').text(daysLeft + ' days');
}
$('#countdownTimerTime').text(hoursLeft + ':' + minutesLeft + ':' + secondsLeft);

}

setInterval(countdown, 1000);

if (document.getElementById('barCanvas')) {
  (function() {
    var myChart = new Chart('barCanvas', 'barDataDiv', 'barTable');
    myChart.interval(50);

    // TODO set up all charts to accept arrays and objects as data

    //   var barInterval = setInterval(function() {
    //     if (document.hasFocus()) {
    //     $.ajax({
    //       type: "POST",
    //       url: 'data-calls',
    //       data: {call: 'example-data-generator'},
    //       success: function(data, status) {
    //       }
    //     });
    //   }
    // }, parseInt(document.querySelector('.widget-barChart').dataset.rate));

  }());
}


if (document.querySelector('#dCalendar')) {
  (function() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemnber"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date();
    var day = d.getDay();
    var date = d.getDate();
    var m = d.getMonth();
    document.querySelector('.dCalendar-weekday').innerText = days[day];
    document.querySelector('.dCalendar-date').innerText = date;
    document.querySelector('.dCalendar-month').innerText = months[m];
  }());
};

function digitalClock() {
var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
if (m < 10) {
  m = '0' + m;
}
if (s < 10) {
  s = '0' + s;
}
var date = today.toDateString();
var time = h + ":" + m + ":" + s;
$('#digitalDate').text(date);
$('#digitalTime').text(time);
}

setInterval(digitalClock, 1000);

if (document.getElementById('doughnutChartDisplay')) {
  (function() {
    var doughnutChart = new Chart('doughnutChartDisplay', 'doughnutChartData', 'dataChartDoughnut');
    doughnutChart.doughnutChart();
  }());
}

if (document.getElementById('pieChartDisplay')) {
  (function() {
    var pieChart = new Chart('pieChartDisplay', 'pieChartData', 'dataChartPie');
    pieChart.pieChart();
  }());
}

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

if (document.getElementById('scatterChartDisplay')) {
  (function() {
    var scatterChart = new Chart('scatterChartDisplay', 'scatterChartData', 'dataChartScatter');
    scatterChart.scatterChart();
  }());
}

if (document.querySelector('.widget-weather')) {

var weatherCall = new Scheduler('.widget-weather', function(data, status) {
  $('.widget-weather').html(data);
}, 'widgets/weather');

weatherCall.start();

};

if (document.querySelector('.widget-xkcd')) {

var xkcdCall = new Scheduler('.widget-xkcd', function(data, status) {
  $('.xkcd-heading').html('XKCD: ' + data.num + '<br>' + data.safe_title);
  $('.xkcd-comic').attr('src', data.img);
});

xkcdCall.start();

};

window.onload = function() {

if (document.querySelectorAll('.timestamp')) {
  document.querySelectorAll('.timestamp').forEach(function(timestamp) {
    timestamp.innerText = new Date(parseInt(timestamp.innerText)).toUTCString();
  });
}

};

console.log('hello');
