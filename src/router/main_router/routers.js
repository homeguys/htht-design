import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import routerConfig from './router_config'

export default () => (
  <div className="main-wrapper">
    <Switch>
      {routerConfig.map(item => {
        return (
          <Route path={item.path} key={item.path}>
            <Suspense fallback={<Spin size="large" />}>{item.component}</Suspense>
          </Route>
        )
      })}
      <Redirect to="/home" />
    </Switch>
  </div>
)
