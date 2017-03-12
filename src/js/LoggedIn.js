import React, { Component } from 'react'
import classNames from './styles/bpStyle.css'

import BPChart from './BPChart'
import BPForm from './BPForm'


class LoggedIn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={classNames.view}>
        <BPForm />
        <BPChart />
      </div>
    )
  }
}

export default LoggedIn;