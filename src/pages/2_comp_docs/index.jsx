import React from 'react'
import { withRouter } from 'react-router-dom'
import { varibles } from '../../config'
import { Routers } from '../../router/comp_docs_router'
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
				<Routers url={url} />
			</div>
		)
	}
}

export default CompDocs
