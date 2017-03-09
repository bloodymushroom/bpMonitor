// @flow
import React, { Component } from 'react'

import BPForm from './BPForm'
import BPChart from './BPChart'
import classNames from './styles/bpStyle.css'

type Props = {}
type State = {
	count: number
}

export default class App extends Component {
	props: Props
	state: State

	constructor(props: Props) {
		super(props)

		this.state = {
			count: 0
		}
	}

	incrementCount() {
		this.setState({
			count: ++this.state.count
		})
	}

	componentDidMount() {
		setInterval(this.incrementCount.bind(this), 500)
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
