
function Carousel(ClassToRotate) {
  var self = this;
  this.rotating = [];
  document.querySelectorAll(ClassToRotate).forEach(function(one) {
    self.rotating.push(one);
  });
  this.intervalLoop = false;
}

  Carousel.prototype.rotate = function() {
    var self = this;

    this.rotating.every(function(rotator, index) {
      if(!rotator.classList.contains('hidden')) {
        $(rotator).fadeOut('1000', function() {
          rotator.classList.add('hidden');
        });
        if (index === self.rotating.length - 1) {
          $(self.rotating[0]).fadeIn('1000', function() {
            self.rotating[0].classList.remove('hidden');
        });
          return false;
        } else {
          $(self.rotating[index + 1]).fadeIn('2000', function() {
           self.rotating[index + 1].classList.remove('hidden');
        });
          return false;
        }
      } else {
        return true;
      }
    });
  };

  Carousel.prototype.interval = function(interval) {
    var self = this;
    this.intervalLoop = setInterval(function() {
      self.rotate();
    }, interval);
  };
