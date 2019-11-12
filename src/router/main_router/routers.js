import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Spin } from 'antd'

const Home = lazy(() => import(/* webpackChunkName: 'home' */ '../../pages/1_home'))
const CompDocs = lazy(() => import(/* webpackChunkName: 'comp-docs' */ '../../pages/2_comp_docs'))
const GisDocs = lazy(() => import(/* webpackChunkName: 'gis-docs' */ '../../pages/3_gis_docs'))

export default () => (
  <div className="main-wrapper">
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<Spin />}>
          <Home />
        </Suspense>
      </Route>
      <Route path="/comp-docs">
        <Suspense fallback={<Spin />}>
          <CompDocs />
        </Suspense>
      </Route>
      <Route path="/gis-docs">
        <Suspense fallback={<Spin />}>
          <GisDocs />
        </Suspense>
      </Route>
    </Switch>
  </div>
)