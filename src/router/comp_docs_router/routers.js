import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Spin } from 'antd'
import routerConfig from './routerConfig'
import { flattenArr, deepCloneObject } from '../../utils/utils'

function getRoute(data) {
	return data.map(item => {
		if (item.children) {
			const childrens = item.children.map(ele => {
				const children = deepCloneObject(ele)
				children.path = `${item.path}/${ele.path}`
				return children
			})
			return getRoute(childrens)
		}
		return item
	})
}

const data = flattenArr(getRoute(routerConfig))

export default props => {
	const { url } = props

	return (
		<Switch>
			{data.map(item => {
				return (
					<Route path={`${url}/${item.path}`} key={item.path}>
						<Suspense fallback={<Spin size="large" />}>{item.component}</Suspense>
					</Route>
				)
			})}
		</Switch>
	)
}
