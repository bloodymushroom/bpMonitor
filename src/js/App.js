// @flow
import React, { Component } from 'react'

import Login from './Login'
import BPForm from './BPForm'
import BPChart from './BPChart'
import classNames from './styles/bpStyle.css'

//mobx
import store from './mobx/Store';
import { observer } from 'mobx-react'

@observer
class App extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div className={classNames.view}>
				{ !store.isAuthenticated && <Login /> }
				{ store.isAuthenticated &&
					<div className={classNames.view}>
						<BPForm />
						<BPChart />
					</div>
				}
			</div>
		)
	}
}

export default App