
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
