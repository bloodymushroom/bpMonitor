import React, { Component } from 'react';
import classNames from './styles/bpStyle.css'

var fakeData = [];

for (var i = 0; i < 30; i++) {
  var sys = Math.floor(Math.random() * 10) + 120;
  var dia = Math.floor(Math.random() * 10) + 80;

  fakeData.push([sys, dia]);
}

class BPChart extends Component {
  constructor() {
    super();

    this.state = {
      dayView: 30
    }

    this.updateView = this.updateView.bind(this);
  }

  renderChart() {
    // get height and width
    var canvas = this.refs.bpCanvas;
    var absHeight = canvas.height;
    var absWidth = canvas.width;
    var margin = 50;
    var height = absHeight - margin;
    var width = absWidth - margin;
    var ctx = canvas.getContext('2d')
    ctx.strokeRect(0, 0, absWidth, absHeight);

    // render axes
    ctx.translate(margin/2, height + margin/2); // set 0 at bottom left
    ctx.scale(1, -1); // y axis reverse
    var increment = width/fakeData.length;

    // transform y proportions 
    var max = 180;
    var min = 60;
    var range = max - min;
    var transformY = function(bp) {
      return height * (bp - min) / range;
    }

    // draw x axes 
    var shouldLabel = false;
    for (var i = min + 10; i < max; i += 10) {
      ctx.beginPath();
      ctx.moveTo(0, transformY(i));
      ctx.lineTo(width, transformY(i));
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#D9D8D7';
      ctx.stroke();

      // label
      ctx.save();
      ctx.
      // ctx.scale(1, -1);
      // ctx.translate(width/2, height/2);
      ctx.font = '16px arial';
      ctx.strokeStyle = 'black';
      ctx.fillText(i, width, transformY(i));
      ctx.restore();
    }

    // draw y axes
    for (var i = 0; i <= width; i+=increment) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.setLineDash([5, 0]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#D9D8D7';
      ctx.stroke();  
    }

    // draw data
    var left = 0, lastSys = transformY(fakeData[0][0]),
        lastDia = transformY(fakeData[0][1])

    for (var i in fakeData) {
      console.log(fakeData[i][0])
      var sys = fakeData[i][0];
      sys = transformY(sys);
      ctx.beginPath();
      ctx.moveTo(left, lastSys);
      ctx.lineTo(left + increment, sys);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#552DB9'
      ctx.stroke();
      lastSys = sys;

      var dia = fakeData[i][1];
      dia = transformY(dia);
      ctx.beginPath();
      ctx.moveTo(left, lastDia);
      ctx.lineTo(left + increment, dia);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#777FAF'
      ctx.stroke();
      lastDia = dia;

      left += increment;
    }

    // ctx.beginPath();
    // ctx.moveTo(0, 100)
    // ctx.lineTo(100, 120);
    // ctx.lineTo(120, 140);
    // ctx.strokeStyle = 'black';
    // ctx.stroke();

  }

  updateView(e) {
    this.setState({
      dayView: e.target.value
    })
  }

  componentDidMount() {
    this.renderChart();
  }
  render() {
    return(
      <div className={classNames.graphContainer}>
        <div className={classNames.graphHeader}>
          <span>History</span>
          <select className={classNames.viewSelector} onChange={(e) => this.updateView(e)} id='bpViewType'>
            <option onClick={this.updateView} selected='true' value='30'>last 30 days</option>
            <option onClick={this.updateView} value='90' >last 3 months</option>
            <option onClick={this.updateView} value='180' >last 6 months</option>
            <option onClick={this.updateView} value='365' >last year</option>
            <option onClick={this.updateView} value='0' >all time</option>
          </select>
        </div>
        <canvas 
          width='320px'
          height='300px'
          ref='bpCanvas' 
        />
      </div>
    )
  }
}

export default BPChart