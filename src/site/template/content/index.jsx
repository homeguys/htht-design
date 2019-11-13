/*eslint-disable*/
import React from 'react'
import { Icon } from 'antd'
import { varibles } from '../../../config'
import './style.scss'

const { hthtPrefix } = varibles

class MainContent extends React.Component {
	componentDidMount() {}

	render() {
		const strings = 'import { Alert } from "antd";'
		return (
			<div id={`${hthtPrefix}-main-content`}>
				<div className="content-wrapper">
					<article>
						<section className="markdown">
							<h1>
								Menu<span>导航菜单</span>
							</h1>
							<p className="description">
								导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
							</p>
							<h2>
								代码演示
								<Icon type="appstore" />
							</h2>
						</section>
						<div className="code-box-wrapper">
							<section className="code-box expend">
								<section className="code-box-demo">aa</section>
								<section className="code-box-meta">
									<div className="code-box-title">
										<a href="#a">内嵌菜单</a>
									</div>
									<div className="code-box-description">
										<div>
											<p>
												垂直菜单，子菜单内嵌在菜单区域。垂直菜单，子菜单内嵌在菜单区域。垂直菜单，子菜单内嵌在菜单区域。垂直菜单，子菜单内嵌在菜单区域。垂直菜单，子菜单内嵌在菜单区域。垂直菜单，子菜单内嵌在菜单区域。垂直菜单，子菜单内嵌在菜单区域。
											</p>
										</div>
									</div>
									<div className="code-box-actions">
										{/* <Icon type="fullscreen-exit" /> */}
										<Icon type="copy" />
										<Icon type="fullscreen" />
									</div>
								</section>
								<section className="highlight-wrapper">
									<div className="highlight">
										<pre className="language-jsx">
											<code>
												<span>{strings}</span>
											</code>
										</pre>
									</div>
								</section>
							</section>
							<section className="code-box">a</section>
							<section className="code-box">a</section>
						</div>
					</article>
				</div>
			</div>
		)
	}
}

export default MainContent
