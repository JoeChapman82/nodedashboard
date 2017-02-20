// Canvas - The id of the <canvas>
// labels - The id of the <div> with data attributes
// data - The id of the data <table>
// pass js objects - no jquery
// TODO - try to add jquery support

"use strict";

function Chart(canvas, labels, data) {
  var self = this;

// amend the height attached to canvas element for tv displays (to account for dufferent aspect ratio)
  if (document.getElementById(canvas).parentElement.classList.contains('flex-widget-tv') || document.getElementById(canvas).parentElement.classList.contains('flex-widget-tv-double-width')) {
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
      if ($.isNumeric(member)) {     /// Need to change this to not use jQuery
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
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "grey";
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
    for (var i = 0; i < this.animateArray.length; i++){
      if (this.animateArray[i] < this.numbersArray[i]) {
        this.animateArray[i]++;
        if (this.animateArray[i] >= this.highestPointY) {
          clearInterval(this.intervalLoop);
        }
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
    this.ctx.fillStyle = "white";
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
