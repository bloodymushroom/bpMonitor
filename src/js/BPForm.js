import React, { Component } from 'react'
import classNames from './styles/bpStyle.css'


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
    console.log('submitted')
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