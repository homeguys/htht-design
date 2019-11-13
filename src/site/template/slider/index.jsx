import React from 'react'
import { Menu, Icon } from 'antd'
import { varibles } from '../../../config'
import './style.scss'

const { hthtPrefix } = varibles
const { SubMenu } = Menu

class Slider extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<div id={`${hthtPrefix}-slider`}>
				<Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
					<Menu.Item key="1">
						<Icon type="mail" />
						Navigation One
					</Menu.Item>
					<Menu.Item key="2">FAQ</Menu.Item>
					<SubMenu
						key="sub1"
						title={
							<span>
								<Icon type="appstore" />
								<span>Navigation Three</span>
							</span>
						}
					>
						<Menu.Item key="3">Option 3</Menu.Item>
						<Menu.Item key="4">Option 4</Menu.Item>
						<SubMenu key="sub1-2" title="Submenu">
							<Menu.Item key="5">Option 5</Menu.Item>
							<Menu.Item key="6">Option 6</Menu.Item>
						</SubMenu>
					</SubMenu>
				</Menu>
			</div>
		)
	}
}

export default Slider
