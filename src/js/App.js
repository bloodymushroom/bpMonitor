// @flow
import React, { Component } from 'react'

import Login from './Login'
import LoggedIn from './LoggedIn'
import classNames from './styles/bpStyle.css'

//mobx
import store from './mobx/Store';
import { observer } from 'mobx-react'

@observer
class App extends Component {
	constructor() {
		super()
	}

	componentWillMount() {
		// store.initializeAuth0(true);
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