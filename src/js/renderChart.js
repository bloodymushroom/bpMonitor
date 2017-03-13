import moment from 'moment'
import { toJS } from 'mobx'

var months = moment.monthsShort();

var renderChart = function(canvas, data, days, obj) {

    // var canvas = this.refs.bpCanvas;
    var absHeight = canvas.height;
    var absWidth = canvas.width;
    var margin = 36;
    var height = absHeight - margin;
    var width = absWidth - margin;
    var ctx = canvas.getContext('2d')

    // reset canvas
    ctx.resetTransform();
    ctx.clearRect(0, 0, absWidth, absHeight);
    // ctx.strokeRect(0, 0, absWidth, absHeight);

    // render axes
    ctx.translate(0, margin/2); 

    // transform y proportions 
    var max = 180;
    var min = 60;
    var range = max - min;
    var transformY = function(bp) {
      return height * (max - bp) / range;
    }

    // draw x axes 
    var shouldLabel = false;
    for (var i = max; i >= min; i -= 20) {
      ctx.beginPath();
      ctx.moveTo(0, transformY(i));
      ctx.lineTo(width, transformY(i));
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#D9D8D7';
      ctx.stroke();

      // label for x axes
      ctx.font = '16px arial';
      ctx.fillStyle = '#5B5655';
      ctx.fillText(i, width + 5, transformY(i) + 8);
    }

    // reset to solid line
    ctx.setLineDash([1,0])

    // generate the calendar
    var currentDay = moment();
    var increment = width/days;

    var lastPoint = data[data.length - 1];
    if (!lastPoint) {
      console.log('no BP data')
      return;
    }

    var lastReading = obj[currentDay.format('YYYY-MM-DD')] || lastPoint;
    var lastSys = transformY(lastReading.systole);
    var lastDia = transformY(lastReading.diastole);
    var left = width;

    for (var i = 0; i < days; i++) {
      console.log(currentDay.format('YYYY-MM-DD'))
      var dayString = currentDay.format('YYYY-MM-DD')
      console.log('corresponding object:', obj[dayString])

      // draw systole
      var sys = lastSys;
      var dia = lastDia;

      if (obj[dayString]) {
        var currentBP = obj[dayString]
        sys = transformY(currentBP.systole);
        dia = transformY(currentBP.diastole);
      }
      // draw sys
      ctx.beginPath();
      ctx.moveTo(left, lastSys);
      ctx.lineTo(left - increment, sys);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#552DB9'
      ctx.stroke();
      lastSys = sys;

      // draw diastole
      ctx.beginPath();
      ctx.moveTo(left, lastDia);
      ctx.lineTo(left - increment, dia);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#552DB9';
      ctx.stroke();
      lastDia = dia;

      // label every month
      if (currentDay.date() === 1) {
        ctx.font = 'bold 16px arial';
        ctx.fillStyle = '#9E9D9D';
        ctx.fillText(months[currentDay.month()], left - 4, height + 16);                
      }
      currentDay.subtract(1, 'days')
      left -= increment;
    }

  }

export default renderChart;