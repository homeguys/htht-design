import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <ul>
    <li>
      <Link to="/">首页</Link>
    </li>
    <li>
      <Link to="/comp-docs">组件</Link>
    </li>
    <li>
      <Link to="/gis-docs">gis文档</Link>
    </li>
  </ul>
)
