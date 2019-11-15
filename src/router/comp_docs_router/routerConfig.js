/**
 * 头部路由跳转和渲染组件
 * 只需在导出里对应增加一个对象就能自动增加一个tabs页以及对应的组件
 */
import React, { lazy } from 'react'

const Preface = lazy(() => import(/* webpackChunkName: 'preface' */ '../../components/preface'))
const Changelog = lazy(() => import(/* webpackChunkName: 'changelog' */ '../../components/changelog'))
const Menu = lazy(() => import(/* webpackChunkName: 'nav' */ '../../components/menu'))
const Slider = lazy(() => import(/* webpackChunkName: 'slider' */ '../../components/slider'))

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
				path: 'nav',
				name: '导航',
				component: <Menu />
			},
			{
				path: 'slider',
				name: '侧边栏',
				component: <Slider />
			}
		]
	}
]
