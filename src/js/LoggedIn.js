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

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
    store.resetAll();
  }

  componentWillMount() {
    store.getAccessToken();
  }

  render() {
    return (
      <div className={classNames.view}>
        <BPForm />
        <BPChart />
        <button onClick={this.logout}>logout</button>
      </div>
    )
  }
}

export default LoggedIn;