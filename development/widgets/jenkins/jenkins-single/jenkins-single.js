window.onload = function() {

if (document.querySelectorAll('.timestamp')) {
  document.querySelectorAll('.timestamp').forEach(function(timestamp) {
    timestamp.innerText = new Date(parseInt(timestamp.innerText)).toUTCString();
  });
}

};
