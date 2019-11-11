import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Switch, Route, withRouter } from 'react-router-dom'
import recompact from 'recompact'
import Header from '../pages/common/header'

const Home = lazy(() => import(/* webpackChunkName: 'home' */ '../pages/home'))
const Docs = lazy(() => import(/* webpackChunkName: 'docs' */ '../pages/docs'))

const enhance = recompact.compose(
	connect(
		null,
		{}
	),
	withRouter
)
@enhance
class MainRouter extends React.Component {
	componentWillMount() {}

	render() {
		return (
			<div className="main-wrapper">
				<Header />
				<Switch>
					<Route path="/" exact>
						<Suspense fallback={<Spin />}>
							<Home />
						</Suspense>
					</Route>
					<Route path="/docs">
						<Suspense fallback={<Spin />}>
							<Docs />
						</Suspense>
					</Route>
				</Switch>
			</div>
		)
	}
}

export default MainRouter
