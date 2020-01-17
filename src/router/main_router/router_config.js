/**
 * 头部路由跳转和渲染组件
 * 只需在导出里对应增加一个对象就能自动增加一个tabs页以及对应的组件
 */
import React, { lazy } from 'react'

const Home = lazy(() => import(/* webpackChunkName: 'home' */ '../../pages/1_home'))
const CompDocs = lazy(() => import(/* webpackChunkName: 'comp-docs' */ '../../pages/2_comp_docs'))
const GisDocs = lazy(() => import(/* webpackChunkName: 'gis-docs' */ '../../pages/3_gis_docs'))

export default [
  {
    name: '首页',
    path: '/home',
    component: <Home />
  },
  {
    name: '组件',
    path: '/comp-docs',
    component: <CompDocs />
  },
  {
    name: 'GIS接口',
    path: '/gis-docs',
    component: <GisDocs />
  }
]
