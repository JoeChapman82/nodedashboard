// Canvas - The id of the <canvas>
// labels - The id of the <div> with data attributes
// data - The id of the data <table>
function Chart(canvas, labels, data) {
  console.log(labels);
  this.canvas = {
    width: canvas.width,
    height: canvas.height,
    margin: canvas.width / 30,
    padding: canvas.width / 120,
  };
  this.labels = {
    hi: (function() {
      console.log(labels);
    }()),
    title: labels.getAttribute('data-title'),
    x: labels.getAttribute('data-x'),
    y: labels.getAttribute('data-y')
  };
  this.data = data;
  this.ctx = canvas.getContext('2d');
  this.colours = ['rgba(70, 130, 180, 1)', 'rgba(71, 187, 179, 1)', 'rgba(236, 102, 60, 1)', 'rgba(220, 89, 69, 1)', 'rgba(6, 111, 154, 1)', 'rgba(0, 128, 128, 1)', 'blue', 'pink'];
  this.dataArrayFull = [];
  (function() {
    $('#' + this.data + ' td').each(function() {
      var item = $(this).text();
      dataArray.push(item);
    });
  }());
  this.numbersArray = (function() {
    var loopIndex = 0;
    var  arrForSum = [];
    dataArrayFull.forEach(function(member) {
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
    dataArrayFull.forEach(function(member) {
    if (loopIndex % 2 === 0) {
      arrForSum.push(member);
    }
    loopIndex++;
  });
  return arrForSum;
  }());
  this.HighestPoint = Math.max(Math.max.apply(Math, this.numbersArray));
  this.yPeak = Math.ceil(highestInArray / Math.pow(10, this.highestPoint.toString().length)) * Math.pow(10, this.highestPoint.toString().length);
  if (highestInArray.toString()[0] < 5) {
    this.yPeak /= 2;
  }
  // Now set up columns
  this.columnNumber = this.numbersArray.length;
  this.columnWidth = ((this.canvas.width - 2 * this.canvas.margin) - ((this.columnNumber - 2) * this.canvas.padding)) / this.columnNumber;
  this.relativePoint = (this.canvas.heigh - 2 * this.canvas.margin) / this.yPeak;
  this.animateArray = [];
  numbersArray.forEach(function() {
    animateArray.push(0);
  });
}

Chart.prototype.drawTitle = function() {
  this.ctx.font = "bold 18px Arial";
  this.ctx.textAlign = 'center';
  this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
  this.ctx.fillText(titleBarC, widthBarC / 2, 20);
};

// draw columns, labels and data points
  Chart.prototype.drawBarChart = function() {
    colourPicker = 0;
    for (i = 0; i < this.columnNumber; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = "2";
      this.ctx.strokeStyle = "grey";
      var grd = this.ctx.createLinearGradient(0, this.canvas.height, 0, this.canvas.height * 0.25);
      grd.addColorStop(0,"white");
      grd.addColorStop(1, this.colours[colourPicker]);
      this.ctx.rect(this.canvas.margin+ (i * this.columnWidth) + ((i - 1) * this.canvas.paddgin), (this.canvas.height - this.canvas.margin) - (this.animateArray[i] * this.relativePoint), this.canvas.width, animateArray[i] * this.relativePoint);
      this.ctx.fillStyle = grd;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.font = "16px Arial";
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
      this.ctx.fillText(this.itemsArray[i], this.canvas.margin + (i  * this.columnWidth) + ((i - 1) * this.canvas.padding) + (this.columnWidth / 2), this.canvas.height - this.canvas.margin + 16, this.columnWidth);
      if (animateArray[i] > yPeakBarC / 10) {
        this.ctx.fillText(this.animateArray[i], this.canvas.margin + (i  * this.columnWidth) + ((i - 1) * this.canvas.padding) + (this.columnWidth / 2), (this.canvas.height - this.canvas.margin) - (this.animateArray[i] * this.relativePoint) + 16, this.columnWidth);
      } else {
        this.ctx.fillText(this.animateArray[i], this.canvas.margin + (i  * this.columnWidth) + ((i - 1) * this.canvas.padding) + (this.columnWidth / 2), (this.canvas.height - this.canvas.margin) - (this.animateArray[i] * this.relativePoint) - this.canvas.padding, this.columnWidth);
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
    Chart.drawTitle();
    Chart.drawBarChart();
    for (i = 0; i < this.animateArray.length; i++){
      if (this.animateArray[i] < this.arrayNumbersBarC[i]) {
        this.animateArray[i]++;
        if (this.animateArray[i] > this.highestInArray) {
          clearInterval();
        }
      }
    }
  };

  // this.interval = setInterval(this.mainBarChart, 1000);

  //
  // var drawBarC = setInterval(mainDrawBarC, 50);
