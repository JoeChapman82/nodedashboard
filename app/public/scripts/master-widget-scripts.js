function countdown(){var t=new Date($("#countdownDueDate").text()),e=new Date,a=new Date(t-e),n=Math.floor(a/864e5),r=a.getHours(),i=a.getMinutes(),o=a.getSeconds();o<10&&(o="0"+o),i<10&&(i="0"+i),0!==n&&$("#countdownTimerDays").text(n+" days"),$("#countdownTimerTime").text(r+":"+i+":"+o)}function digitalClock(){var t=new Date,e=t.getHours(),a=t.getMinutes(),n=t.getSeconds();a<10&&(a="0"+a),n<10&&(n="0"+n);var r=t.toDateString(),i=e+":"+a+":"+n;$("#digitalDate").text(r),$("#digitalTime").text(i)}document.getElementById("barCanvas")&&!function(){var t=new Chart("barCanvas","barDataDiv","barTable");t.interval(50)}(),document.getElementById("clock")&&function(){function t(){var t=document.getElementById("clock"),e=t.getContext("2d"),a=t.width/2;e.beginPath(),e.fillStyle="grey",e.arc(a,a,a,0,2*Math.PI),e.fill(),e.fillStyle="white",e.beginPath(),e.arc(a,a,10,0,2*Math.PI),e.fill(),e.font=a/10+"px arial",e.textAlign="center",e.textBaseline="middle";for(var n=1;n<=12;n++)e.fillText(n,a+.9*a*Math.sin(2*n*Math.PI/12),a-.9*a*Math.cos(2*n*Math.PI/12));var r=(new Date).getHours(),i=(new Date).getMinutes(),o=(new Date).getSeconds(),l=r%12+i/60+o/3600,h=2*l*Math.PI/12,c=2*i*Math.PI/60,s=2*o*Math.PI/60;e.strokeStyle="white",e.moveTo(a,a),e.lineTo(a+.6*a*Math.sin(h),a-.6*a*Math.cos(h)),e.lineWidth=5,e.stroke(),e.moveTo(a,a),e.lineTo(a+.8*a*Math.sin(c),a-.8*a*Math.cos(c)),e.lineWidth=3,e.stroke(),e.moveTo(a,a),e.lineTo(a+.9*a*Math.sin(s),a-.9*a*Math.cos(s)),e.lineWidth=2,e.stroke()}setInterval(t,1e3)}(),setInterval(countdown,1e3),setInterval(digitalClock,1e3),document.getElementById("doughnutChartDisplay")&&!function(){var t=new Chart("doughnutChartDisplay","doughnutChartData","dataChartDoughnut");t.doughnutChart()}(),document.getElementById("pieChartDisplay")&&!function(){var t=new Chart("pieChartDisplay","pieChartData","dataChartPie");t.pieChart()}(),document.querySelector("#progressMeterDisplay")&&!function(){function t(){i.beginPath(),i.arc(100,100,80,.75*Math.PI,.25*Math.PI,!1),i.strokeStyle="grey",i.lineCap="butt",i.lineWidth=35,i.stroke(),i.closePath()}function e(){i.beginPath(),i.arc(100,100,80,.75*Math.PI,a()*Math.PI,!1),i.strokeStyle="rgba(255, 255, 255, 1)",i.lineCap="butt",i.lineWidth=35,i.stroke(),i.font="bold 40px Arial",i.fillStyle="rgba(255, 255, 255, 1)",l<10?i.fillText(l+"%",69,115):100===l?i.fillText(l+"%",52,115):i.fillText(l+"%",62,115),i.closePath()}function a(){return l<=83?.75+.015*l:.25-.0138*(100-l)}function n(){i.clearRect(0,0,r.width,r.height),t(),e(),l++,l>h&&clearInterval(c)}var r=document.getElementById("progressMeterDisplay"),i=r.getContext("2d"),o=document.getElementById("progressMeterData"),l=0,h=o.getAttribute("data-percent"),c=setInterval(n,50)}(),document.getElementById("scatterChartDisplay")&&!function(){var t=new Chart("scatterChartDisplay","scatterChartData","dataChartScatter");t.scatterChart()}();