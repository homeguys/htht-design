/**
 * 头部路由跳转和渲染组件
 * 只需在导出里对应增加一个对象就能自动增加一个tabs页以及对应的组件
 */
import React, { lazy } from 'react'

const Preface = lazy(() => import(/* webpackChunkName: 'Preface' */ '../../components/preface'))
const Changelog = lazy(() => import(/* webpackChunkName: 'Changelog' */ '../../components/change_log'))

/* search */
const TimeChoice = lazy(() => import(/* webpackChunkName: 'TimeChoice' */ '../../components/time_choice'))
const SpaceChoice = lazy(() => import(/* webpackChunkName: 'SpaceChoice' */ '../../components/space_choice'))
const LinkageSelect = lazy(() => import(/* webpackChunkName: 'LinkageSelect' */ '../../components/linkage_select'))
const TimeSwitch = lazy(() => import(/* webpackChunkName: 'TimeSwitch' */ '../../components/time_switch'))
const SearchBox = lazy(() => import(/* webpackChunkName: 'SearchBox' */ '../../components/search_box'))

/* list */
const List = lazy(() => import(/* webpackChunkName: 'List' */ '../../components/list'))

/* statistics */
const ChartPie = lazy(() => import(/* webpackChunkName: 'Pie' */ '../../components/chart_pie'))
const ChartBar = lazy(() => import(/* webpackChunkName: 'Bar' */ '../../components/chart_bar'))
const ChartLine = lazy(() => import(/* webpackChunkName: 'Line' */ '../../components/chart_line'))
const ChartGauge = lazy(() => import(/* webpackChunkName: 'Gauge' */ '../../components/chart_gauge'))
const Videoplay = lazy(() => import(/* webpackChunkName: 'Videoplay' */ '../../components/video_play'))
const Carousels = lazy(() => import(/* webpackChunkName: 'Carousel' */ '../../components/carousels'))

/* palybar */
const Playbar = lazy(() => import(/* webpackChunkName: 'Playbar' */ '../../components/playbar'))


/* legend */
const Legend = lazy(() => import(/* webpackChunkName: 'Legend' */ '../../components/legend'))


/* gis */
const Toolbar = lazy(() => import(/* webpackChunkName: 'Toolbar' */ '../../components/toolbar'))
const InitMap = lazy(() => import(/* webpackChunkName: 'InitMap' */ '../../components/initMap'))
const BasicControl = lazy(() => import(/* webpackChunkName: 'BasicControl' */ '../../components/basic_control'))
const BasicDraw = lazy(() => import(/* webpackChunkName: 'BasicDraw' */ '../../components/basic_draw'))
const TextAndPic = lazy(() => import(/* webpackChunkName: 'TextAndPic' */ '../../components/text_pic'))
const SwitchMap = lazy(() => import(/* webpackChunkName: 'SwitchMap' */ '../../components/switch_map'))
const ContourLine = lazy(() => import(/* webpackChunkName: 'ContourLine' */ '../../components/contour_line'))
const Flow = lazy(() => import(/* webpackChunkName: 'Flow' */ '../../components/flow'))
const Plotting = lazy(() => import(/* webpackChunkName: 'Plotting' */ '../../components/plotting'))
const Mark = lazy(() => import(/* webpackChunkName: 'Mark' */ '../../components/mark'))
const GeoserveService = lazy(() => import(/* GeoserveService: 'BasicDraw' */ '../../components/geoserve_service'))
const Wind = lazy(() => import(/* webpackChunkName: 'Wind' */ '../../components/wind'))


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
  {
    path: 'component',
    name: '组件',
    children: [
      {
        path: 'search',
        name: '查询',
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
            name: 'LinkageSelect 三级联动',
            component: <LinkageSelect />
          },
          {
            path: 'time-switch',
            name: 'TimeSwitch 时间切换',
            component: <TimeSwitch />
          },
          {
            path: 'searchbox',
            name: 'Searchbox 搜索框',
            component: <SearchBox />
          }
        ]
      },
      {
        path: 'search-result',
        name: '查询结果',
        children: [
          {
            path: 'list',
            name: 'List 列表',
            component: <List />
          }
        ]
      },
      {
        path: 'statistics',
        name: '统计（大屏）',
        children: [
          {
            path: 'pie',
            name: 'Pie 饼状图',
            component: <ChartPie />
          },
          {
            path: 'bar',
            name: 'Bar 柱状图',
            component: <ChartBar />
          },
          {
            path: 'line',
            name: 'Line 折线图',
            component: <ChartLine />
          },
          {
            path: 'gauge',
            name: 'Gauge 仪表盘',
            component: <ChartGauge />
          },
          {
            path: 'videoplay',
            name: 'Videoplay 视频播放',
            component: <Videoplay />
          },
          {
            path: 'carousels',
            name: 'Carousels 轮播图',
            component: <Carousels />
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
            path: 'playbar',
            name: '播放条',
            component: <Playbar />
          }
        ]
      },

      {
        path: 'legend',
        name: '图例',
        children: [
          {
            path: 'legend',
            name: '图例',
            component: <Legend />
          }
        ]
      },
      {
        path: 'gis',
        name: 'GIS',
        children: [
          {
            path: 'toolbar',
            name: '工具栏',
            component: <Toolbar />
          },
          {
            path: 'initMap',
            name: '初始化地图',
            component: <InitMap />
          },
          {
            path: 'basicControl',
            name: '基础控制',
            component: <BasicControl />
          },
          {
            path: 'BasicDraw',
            name: '基础绘制',
            component: <BasicDraw />
          },
          {
            path: 'TextAndPic',
            name: '文字与贴图',
            component: <TextAndPic />
          },
          {
            path: 'SwitchMap',
            name: '底图切换',
            component: <SwitchMap />
          },
          {
            path: 'ContourLine',
            name: '等值线',
            component: <ContourLine />
          },
          {
            path: 'Flow',
            name: '流场',
            component: <Flow />
          },
          {
            path: 'Plotting',
            name: '填图',
            component: <Plotting />
          },
          {
            path: 'Mark',
            name: 'mark点',
            component: <Mark />
          },
          {
            path: 'GeoserveService',
            name: 'geoserve服务',
            component: <GeoserveService />
          },
          {
            path: 'Wind',
            name: '风场',
            component: <Wind />
          }
        ]
      }
    ]
  }
]
