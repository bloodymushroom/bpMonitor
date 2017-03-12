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

  getIdToken(){
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }

    store.idToken = idToken;
    return idToken;
  }

  componentWillMount() {
    this.lock = new Auth0Lock(secrets.CLIENT_ID, secrets.DOMAIN);
  }

  render() {
    return (<Login lock={this.lock} />)
  }
}

export default Auth0Login