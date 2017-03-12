import React, { Component } from 'react'
import classNames from './styles/bpStyle.css'

import { observer } from 'mobx-react';
import store from './mobx/Store';
import renderChart from './renderChart'

class BPForm extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      systole: '',
      diastole: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('adding', this.state)
    store.addBP({
      date: this.state.date,
      systole: +this.state.systole,
      diastole: +this.state.diastole
    })

    store.addReading({
      systole: this.state.systole, 
      diastole: this.state.diastole
      // index: store.currentIndex
    });
    // store.currentIndex++;
    var slicer = store.dayRange < store.allData.length? store.dayRange : store.allData.length;
    renderChart(store.canvas, store.allData.slice(-slicer))
  }

  handleInput(e) {
    var id = e.target.id;
    var value = e.target.value;

    this.setState({
      [id]: value
    })
  }

  render() {
    return (
        <form className={classNames.containerForm} onSubmit={this.handleSubmit} id='bpEntry'>
          { store.user && <span>Welcome, {store.user.username || store.user.email}!</span> }
          <span className={classNames.inputHeader}>Record Today's Blood Pressure</span>
          <div className={classNames.inputContainer}>
            <input 
              id='systole' 
              type='number' 
              value={this.state.systole} 
              onChange={this.handleInput}
            />
            /
            <input 
              id='diastole' 
              type='number' 
              value={this.state.diastole}
              onChange={this.handleInput}
            />
          </div>
          <input className={classNames.submitButton} type='submit' value='Submit' />
        </form>
    )   
  }
}

export default BPForm