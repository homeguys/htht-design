import React from 'react'
import { varibles } from '../../../config'

const { hthtPrefix } = varibles

class DocContent extends React.Component {
  componentDidMount() {}

  render() {
    const { children } = this.props
    return (
      <div id={`${hthtPrefix}-main-content`}>
        <div className="content-wrapper">{children}</div>
      </div>
    )
  }
}

export default DocContent
