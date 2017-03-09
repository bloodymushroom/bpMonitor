var renderChart = function(canvas, data, params) {
    // get height and width
    var chartData = data || [];

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
    ctx.translate(0, margin/2); // set 0 at bottom left
    // ctx.scale(1, -1); // y axis reverse
    var increment = width/chartData.length;

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

    // draw y axes
    // for (var i = 0; i <= width; i+=increment * 20 * width/ ) {
    //   // count++;
    //   // if (count % Math.floor(data.length/20) === 0) {      
    //     ctx.font = '16px arial';
    //     ctx.fillStyle = '#5B5655';
    //     ctx.fillText(Math.floor(i/increment), i - 4, height + 16);
    //   // }
    // }

    // reset to solid line
    ctx.setLineDash([1,0])

    // draw data
    var left = 0, lastSys = transformY(chartData[0][0]),
        lastDia = transformY(chartData[0][1])

    for (var i in chartData) {
      var sys0 = chartData[i][0];
      var sys = sys0? transformY(sys0): lastSys;
      ctx.beginPath();
      ctx.moveTo(left, lastSys);
      ctx.lineTo(left + increment, sys);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#552DB9'
      ctx.stroke();
      lastSys = sys;

      var dia0 = chartData[i][1];
      var dia = dia0? transformY(dia0): lastDia;
      ctx.beginPath();
      ctx.moveTo(left, lastDia);
      ctx.lineTo(left + increment, dia);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#777FAF'
      ctx.stroke();
      lastDia = dia;

      if ( i % 5 === 0) {

        ctx.font = '16px arial';
        ctx.strokeStyle = 'black';
        ctx.fillText(Math.floor(sys0), left, sys);
        ctx.fillText(Math.floor(dia0), left, dia);
      }

      var tens = data.length < 100? 10 : (data.length < 500? 50 : 100);
      // label if it is the first of 10s
      if (chartData[i][2] % tens === 0) {
        ctx.font = 'bold 16px arial';
        ctx.fillStyle = '#9E9D9D';
        ctx.fillText(chartData[i][2], left - 4, height + 16);
        // ctx.fillText(Math.floor(i/increment), i - 4, height + 16);
      }

      left += increment;
    }
  }

export default renderChart;