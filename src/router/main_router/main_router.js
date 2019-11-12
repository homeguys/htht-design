import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

export default () => (
	<Switch>
		<Route path="/" exact>
			{/* <Suspense fallback={<Spin />}>
				<Home />
			</Suspense> */}
		</Route>
		{/* <Route path="/docs">
			<Suspense fallback={<Spin />}>
				<Docs />
			</Suspense>
		</Route> */}
	</Switch>
)
