import React from 'react'
import { withRouter } from 'react-router-dom'
import { varibles } from '../../config'
import { Routers } from '../../router/gis_docs_router'
import './style.scss'

const { hthtPrefix } = varibles

@withRouter
class GisDocs extends React.Component {
	componentDidMount() {}

	render() {
    const { match } = this.props
    const { url } = match
    return (
      <div id={`${hthtPrefix}-gis-docs`}>
        <Routers url={url} />
      </div>
    )
	}
}

export default GisDocs
