import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MainRouter from './router/main.router'
import './style/style.scss'
import './style/reset.scss'
import reducer from './store/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers())

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<ConfigProvider locale={zhCN}>
				<MainRouter />
			</ConfigProvider>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
