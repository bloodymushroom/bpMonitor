import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import Login from './Login'
import secrets from '../secrets.json'
// import dotenv from 'dotenv'

// dotenv.config()
// 
//mobx
import store from './mobx/Store';
import { observer } from 'mobx-react'

@observer
class Auth0Login extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log('env', process.env)
      this.lock = new Auth0Lock(secrets.CLIENT_ID, secrets.DOMAIN);
  }

  render() {
    return (<Login lock={this.lock} />)
  }
}

export default Auth0Login