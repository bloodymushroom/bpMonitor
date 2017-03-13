// @flow
import React, { Component } from 'react'

import Login from './Login'
// import BPForm from './BPForm'
// import BPChart from './BPChart'
import LoggedIn from './LoggedIn'
import Auth0Login from './Auth0Login'
import classNames from './styles/bpStyle.css'
// import secrets from '../secrets.json'
// import Auth0Lock from 'auth0-lock'

//mobx
import store from './mobx/Store';
import { observer } from 'mobx-react'

@observer
class App extends Component {
	constructor() {
		super()
	}

	componentWillMount() {
		store.getAccessToken();
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className={classNames.view}>
				{ !store.loggedIn && <Login /> }
				{ store.loggedIn &&
					<LoggedIn />
				}
			</div>
		)
	}
}

export default App