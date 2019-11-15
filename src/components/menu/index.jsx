/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unused-state */
import React from 'react'
import axios from 'axios'
import MainContent from '../../site/template/content'
import description from './description.json'
import manifest from './demo/manifest.md'
import { handleArrs } from '../../utils/utils'
import Demos from './demo'

class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			demoCode: ''
		}
	}

	componentDidMount() {
		axios.get(manifest).then(res => {
			const { data } = res
			this.setState({ demoCode: data.split('```') })
		})
	}

	render() {
		const { demoCode } = this.state
		const data = handleArrs(Demos, demoCode)
		return <MainContent data={data} description={description} />
	}
}

export default Nav
