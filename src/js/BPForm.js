import React, { Component } from 'react'
import classNames from './styles/bpStyle.css'
import moment from 'moment'

import { observer } from 'mobx-react';
import store from './mobx/Store';
import renderChart from './renderChart'

class BPForm extends Component {
  constructor() {
    super();

    var today = moment().format('YYYY-MM-DD')

    this.state = {
      date: today.toString(),
      systole: '',
      diastole: '',
      errorMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  formIsValid() {
    if (this.state.systole.length === 0 || this.state.diastole.length === 0) {
      this.setState({
        errorMessage: 'Please fill out both BP fields.'
      })

      return false;
    }

    if (this.state.systole < 1 || this.state.diastole < 1
      || this.state.systole > 999 || this.state.diastole > 999) {
      
      this.setState({
        errorMessage: 'Pressures must be between 1 and 1000'
      })

      return false;
    }

    this.setState({
      errorMessage: ''
    })

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.formIsValid()) {
      return;
    }

    store.addBP({
      date: this.state.date,
      systole: +this.state.systole,
      diastole: +this.state.diastole
    })

    var slicer = store.dayRange < store.allData.length? store.dayRange : store.allData.length;
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
          {store.user && <span>Welcome, {store.user.username}!</span>}
          <span className={classNames.inputHeader}>Record Today's Blood Pressure</span>
          <input 
            id='date'
            type='date'
            value={this.state.date}
            onChange={this.handleInput}
          />
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
          <span className={classNames.errorMessage}>{this.state.errorMessage}</span>
          <input className={classNames.submitButton} type='submit' value='Submit' />
        </form>
    )   
  }
}

export default BPForm