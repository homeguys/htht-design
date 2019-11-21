import React from 'react'
import { Link } from 'react-router-dom'
import mainRouterConfig from './router_config'

export default () => (
  <ul>
    {mainRouterConfig.map(item => {
      return (
        <li key={item.path}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      )
    })}
  </ul>
)
