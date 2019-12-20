/**
 * 头部路由跳转和渲染组件
 * 只需在导出里对应增加一个对象就能自动增加一个tabs页以及对应的组件
 */
import React, { lazy } from 'react'

const Preface = lazy(() => import(/* webpackChunkName: 'Preface' */ '../../components_gis/preface'))
const Changelog = lazy(() => import(/* webpackChunkName: 'Changelog' */ '../../components_gis/change_log'))
const Install = lazy(() => import(/* webpackChunkName: 'Install' */ '../../components_gis/install'))

/* webMap */
const NjHTHTMAP = lazy(() => import(/* webpackChunkName: 'NjHTHTMAP' */ '../../components_gis/NjHTHTMAP'))
/* config */
const MapConfig = lazy(() => import(/* webpackChunkName: 'MapConfig' */ '../../components_gis/mapConfig'))
const ProductConfig = lazy(() => import(/* webpackChunkName: 'ProductConfig' */ '../../components_gis/productConfig'))
/* entity */
const BasePlottingInfo = lazy(() => import(/* webpackChunkName: 'BasePlottingInfo' */ '../../components_gis/BasePlottingInfo'))
const BaseStaInfo = lazy(() => import(/* webpackChunkName: 'BaseStaInfo' */ '../../components_gis/BaseStaInfo'))
const Point = lazy(() => import(/* webpackChunkName: 'Point' */ '../../components_gis/Point'))
/* enum */
const DataTypeEnum = lazy(() => import(/* webpackChunkName: 'DataTypeEnum' */ '../../components_gis/data_type_enum'))
const ErrorEnum = lazy(() => import(/* webpackChunkName: 'ErrorEnum' */ '../../components_gis/error_enum'))
const EventEnum = lazy(() => import(/* webpackChunkName: 'EventEnum' */ '../../components_gis/event_enum'))
const MapTypeEnum = lazy(() => import(/* webpackChunkName: 'MapTypeEnum' */ '../../components_gis/map_type_enum'))
const MarkTypeEnum = lazy(() => import(/* webpackChunkName: 'MarkTypeEnum' */ '../../components_gis/mark_type_enum'))
const PlottingTypeEnum = lazy(() => import(/* webpackChunkName: 'PlottingTypeEnum' */ '../../components_gis/plotting_type_enum'))
const ProductEnum = lazy(() => import(/* webpackChunkName: 'ProductEnum' */ '../../components_gis/product_enum'))
const WindTypeEnum = lazy(() => import(/* webpackChunkName: 'WindTypeEnum' */ '../../components_gis/wind_type_enum'))
/* model */
const Canvas = lazy(() => import(/* webpackChunkName: 'Canvas' */ '../../components_gis/canvas'))
const CanvasContour = lazy(() => import(/* webpackChunkName: 'CanvasContour' */ '../../components_gis/canvas_contour'))
const CanvasWind = lazy(() => import(/* webpackChunkName: 'CanvasWind' */ '../../components_gis/canvas_wind'))
const GroundDraw = lazy(() => import(/* webpackChunkName: 'GroundDraw' */ '../../components_gis/GroundDraw'))
const Windy = lazy(() => import(/* webpackChunkName: 'Windy' */ '../../components_gis/windy'))

/* utils */
const MathUtil = lazy(() => import(/* webpackChunkName: 'MathUtil' */ '../../components_gis/MathUtil'))

export default [
  {
    path: 'preface',
    name: '前言',
    component: <Preface/>
  },
  {
    path: 'changelog',
    name: '更新日志',
    component: <Changelog/>
  },
  {
    path: 'install',
    name: '安装教程',
    component: <Install/>
  },
  {
    path: 'webMap',
    name: 'webMap',
    children: [
      {

        path: 'NjHTHTMAP',
        name: 'NjHTHTMAP',
        component: <NjHTHTMAP/>

      },
      {
        path: 'config',
        name: 'config',
        children: [
          {
            path: 'mapConfig',
            name: 'mapConfig',
            component: <MapConfig/>
          },
          {
            path: 'productConfig',
            name: 'productConfig',
            component: <ProductConfig/>
          }
        ]
      },
      {
        path: 'entity',
        name: 'entity',
        children: [
          {
            path: 'BasePlottingInfo',
            name: 'BasePlottingInfo',
            component: <BasePlottingInfo/>
          },
          {
            path: 'BaseStaInfo',
            name: 'BaseStaInfo',
            component: <BaseStaInfo/>
          },
          {
            path: 'Point',
            name: 'Point',
            component: <Point/>
          }
        ]
      },
      {
        path: 'enum',
        name: 'enum',
        children: [
          {
            path: 'data_type_enum',
            name: 'data_type_enum',
            component: <DataTypeEnum/>
          },
          {
            path: 'error_enum',
            name: 'error_enum',
            component: <ErrorEnum/>
          },
          {
            path: 'event_enum',
            name: 'event_enum',
            component: <EventEnum/>
          },
          {
            path: 'map_type_enum',
            name: 'map_type_enum',
            component: <MapTypeEnum/>
          },
          {
            path: 'mark_type_enum',
            name: 'mark_type_enum',
            component: <MarkTypeEnum/>
          },
          {
            path: 'plotting_type_enum',
            name: 'plotting_type_enum',
            component: <PlottingTypeEnum/>
          },
          {
            path: 'product_enum',
            name: 'product_enum',
            component: <ProductEnum/>
          },
          {
            path: 'wind_type_enum',
            name: 'wind_type_enum',
            component: <WindTypeEnum/>
          }
        ]
      },
      {
        path: 'model',
        name: 'model',
        children: [
          {
            path: 'canvas',
            name: 'canvas',
            component: <Canvas/>
          },
          {
            path: 'canvas_contour',
            name: 'canvas_contour',
            component: <CanvasContour/>
          },
          {
            path: 'canvas_wind',
            name: 'canvas_wind',
            component: <CanvasWind/>
          },
          {
            path: 'GroundDraw',
            name: 'GroundDraw',
            component: <GroundDraw/>
          },
          {
            path: 'windy',
            name: 'windy',
            component: <Windy/>
          }
        ]
      },
      {
        path: 'utils',
        name: 'utils',
        children: [
          {
            path: 'MathUtil',
            name: 'MathUtil',
            component: <MathUtil/>
          }
        ]
      }
    ]
  }
]
