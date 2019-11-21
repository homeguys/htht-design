/**
 * 头部路由跳转和渲染组件
 * 只需在导出里对应增加一个对象就能自动增加一个tabs页以及对应的组件
 */
import React, { lazy } from 'react'

const Preface = lazy(() => import(/* webpackChunkName: 'Preface' */ '../../components/preface'))
const Changelog = lazy(() =>
  import(/* webpackChunkName: 'Changelog' */ '../../components/changelog')
)
const Menu = lazy(() => import(/* webpackChunkName: 'Menu' */ '../../components/menu'))
const SearchBox = lazy(() =>
  import(/* webpackChunkName: 'SearchBox' */ '../../components/search-box')
)
const List = lazy(() => import(/* webpackChunkName: 'List' */ '../../components/list'))
const TimeChoice = lazy(() =>
  import(/* webpackChunkName: 'TimeChoice' */ '../../components/time_choice')
)
const SpaceChoice = lazy(() =>
  import(/* webpackChunkName: 'SpaceChoice' */ '../../components/space_choice')
)
const LinkageSelect = lazy(() =>
  import(/* webpackChunkName: 'LinkageSelect' */ '../../components/linkage_select')
)

export default [
  {
    path: 'preface',
    name: '前言',
    component: <Preface />
  },
  {
    path: 'changelog',
    name: '更新日志',
    component: <Changelog />
  },
  // {
  //   path: 'structure',
  //   name: '结构',
  //   children: [
  //     {
  //       path: 'searchbox',
  //       name: 'searchbox 搜索框',
  //       component: <SearchBox />
  //     }
  //   ]
  // },
  {
    path: 'component',
    name: '组件',
    children: [
      {
        path: 'search',
        name: '搜索',
        children: [
          {
            path: 'time-choice',
            name: 'TimeChoice 时间选择',
            component: <TimeChoice />
          },
          {
            path: 'space-choice',
            name: 'SpaceChoice 空间选择',
            component: <SpaceChoice />
          },
          {
            path: 'linkage-select',
            name: 'linkage-select 三级联动',
            component: <LinkageSelect />
          },
          {
            path: 'searchbox',
            name: 'searchbox 搜索框',
            component: <SearchBox />
          }
        ]
      },
      {
        path: 'list',
        name: '列表',
        children: [
          {
            path: 'something',
            name: 'something'
          }
        ]
      },
      {
        path: 'exhibition',
        name: '展示',
        children: [
          {
            path: 'something',
            name: 'something'
          }
        ]
      },
      {
        path: 'shopcar',
        name: '购物车',
        children: [
          {
            path: 'something',
            name: 'something'
          }
        ]
      },
      {
        path: 'paly',
        name: '播放',
        children: [
          {
            path: 'something',
            name: 'something'
          }
        ]
      },
      {
        path: 'statistics',
        name: '统计（大屏）',
        children: [
          {
            path: 'something',
            name: 'something'
          }
        ]
      },
      {
        path: 'gis',
        name: 'GIS',
        children: [
          {
            path: 'something',
            name: 'something'
          }
        ]
      }
    ]
  }
]
