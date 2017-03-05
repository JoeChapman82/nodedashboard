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
