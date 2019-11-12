import React from 'react'
import { varibles } from '../../config'
import './style.scss'

const { hthtPrefix } = varibles

class MainContent extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<div id={`${hthtPrefix}-main-content`}>
        <div>MainContent</div>
			</div>
		)
	}
}

export default MainContent
