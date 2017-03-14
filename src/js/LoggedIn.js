import React, { Component } from 'react'
import classNames from './styles/bpStyle.css'

import BPChart from './BPChart'
import BPForm from './BPForm'

//mobx
import store from './mobx/Store';
import { observer } from 'mobx-react'

class LoggedIn extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log('login mounted')
    // store.initializeAuth0(true);
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