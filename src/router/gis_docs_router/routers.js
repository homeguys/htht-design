import React, { Suspense, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import Slider from '../../site/template/slider'
import routerConfig from './router_config'

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
    <Fragment>
      <Suspense fallback={<Spin size="large" />}>
        <Slider menuConfig={routerConfig} />
        <Switch>
          {data.map(item => {
            return (
              <Route path={`${url}/${item.path}`} key={item.path}>
                {item.component}
              </Route>
            )
          })}
          <Redirect to={`${url}/${data[0].path}`} />
        </Switch>
      </Suspense>
    </Fragment>
  )
}
