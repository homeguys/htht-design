import React from 'react'
import { varibles } from '../../../config'

const { hthtPrefix } = varibles

function DocContent(props) {
  const { children } = props
  return (
    <div id={`${hthtPrefix}-main-content`}>
      <div className="content-wrapper">{children}</div>
    </div>
  )
}

export default DocContent
