import React from 'react'
import { withRouter } from 'react-router-dom'
import Slider from '../../site/template/slider'
import { varibles } from '../../config'
import { routerConfig, Routers } from '../../router/comp_docs_router'
import './style.scss'

const { hthtPrefix } = varibles

@withRouter
class CompDocs extends React.Component {
	componentDidMount() {}

	render() {
		const { match } = this.props
		const { url } = match
		return (
			<div id={`${hthtPrefix}-comp-docs`}>
				<Slider menuConfig={routerConfig} />
				<Routers url={url} />
			</div>
		)
	}
}

export default CompDocs
