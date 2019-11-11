import React from 'react'
import { Link } from 'react-router-dom'
import logoPic from '../../../static/images/logo.jpeg'
import './style.scss'

class Header extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<div id="header">
				<div id="logo">
					<Link to="/">
						<img src={logoPic} alt="logo" />
						<h1>航天宏图组件库</h1>
					</Link>
				</div>
				<div id="nav">
					<ul>
						<li>
							<Link to="/">首页</Link>
						</li>
						<li>
							<Link to="/docs">组件</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Header
