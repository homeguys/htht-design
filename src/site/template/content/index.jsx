/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Icon, Tooltip } from 'antd'
import Clipboard from 'react-clipboard.js'
import Highlight from '../highlight'
import { varibles } from '../../../config'
import { getParents } from '../../../utils/utils'
import './style.scss'

const { hthtPrefix } = varibles

class MainContent extends React.Component {
	// 复制代码成功
	onSuccess = () => {}

	// 收缩展示代码
	toggleCode = e => {
		const codeBox = getParents(e.target, 'code-box')
		codeBox.classList.toggle('expend')
	}

	render() {
		const { description, data } = this.props
		return (
			<div id={`${hthtPrefix}-main-content`}>
				<div className="content-wrapper">
					<article>
						<section className="markdown">
							<h1>
								{description.value}
								<span>{description.name}</span>
							</h1>
							<p className="description">{description.detail}</p>
							<h2>
								代码演示
								<Icon type="appstore" />
							</h2>
						</section>
						<div className="code-box-wrapper">
							{data.map((item, index) => {
								return (
									<section className="code-box" key={index}>
										<section className="code-box-demo">{<item.component />}</section>
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
												<Clipboard data-clipboard-text={item.code} onSuccess={this.onSuccess}>
													<Tooltip title="复制代码">
														<i className="icon-copy" />
													</Tooltip>
												</Clipboard>

												<Tooltip title="展开代码">
													<i className="icon-expend" onClick={this.toggleCode} />
												</Tooltip>
											</div>
										</section>
										<section className="highlight-wrapper">
											<div className="highlight">
												<Highlight className="html">{item.code}</Highlight>
											</div>
										</section>
									</section>
								)
							})}
						</div>
					</article>
				</div>
			</div>
		)
	}
}

export default MainContent
