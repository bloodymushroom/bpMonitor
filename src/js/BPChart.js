import React, { Component } from 'react';
import classNames from './styles/bpStyle.css'

import { observer } from 'mobx-react'
import store from './mobx/Store'
import renderChart from './renderChart'

var fakeData = store.allData;

@observer
class BPChart extends Component {
  constructor() {
    super();

    this.updateView = this.updateView.bind(this);
  }

  updateView(e) {
    store.dayRange = e.target.value;
    renderChart(this.refs.bpCanvas, store.allData.slice(-store.dayRange), store.dayRange, store.allDataObject)
  }

  componentWillMount() {

  }

  componentDidMount() {
    store.canvas = this.refs.bpCanvas;
    // renderChart(this.refs.bpCanvas, store.allData.slice(-store.dayRange), store.dayRange, store.allDataObject)
  }

  render() {
    return(
      <div className={classNames.graphContainer}>
        <div className={classNames.graphHeader}>
          <span>History</span>
          <select 
            className={classNames.viewSelector} 
            onChange={(e) => {
              this.updateView(e);
            }}
            id='bpViewType'
          >
            <option onClick={this.updateView} selected='true' value='30'>last 30 days</option>
            <option onClick={this.updateView} value='90' >last 3 months</option>
            <option onClick={this.updateView} value='180' >last 6 months</option>
            <option onClick={this.updateView} value='365' >last year</option>
          </select>
        </div>
        <canvas 
          id={store.dayRange}
          width='320px'
          height='280px'
          ref='bpCanvas'
        />
        
      </div>
    )
  }
}

export default BPChart