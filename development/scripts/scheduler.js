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
