import React from 'react'
import MainContent from '../../site/template/content'
import manifest from './manifest.json'

class Nav extends React.Component {
	componentDidMount() {}

	render() {
		return <MainContent manifest={manifest} />
	}
}

export default Nav
