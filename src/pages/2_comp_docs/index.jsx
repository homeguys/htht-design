import React from 'react'
import Slider from '../../site/template/slider'
import MainContent from '../../site/template/content'
import { varibles } from '../../config'
import { routerConfig, Routers } from '../../router/comp_docs_router'
import './style.scss'

const { hthtPrefix } = varibles

class CompDocs extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<div id={`${hthtPrefix}-comp-docs`}>
				<Slider menuConfig={routerConfig} />
				<MainContent />
				<Routers />
			</div>
		)
	}
}

export default CompDocs
