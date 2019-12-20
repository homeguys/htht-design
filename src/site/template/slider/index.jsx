/**
 * 默认展开已写死，后期需要重新写活公用
 */
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { varibles } from '../../../config'
import './style.scss'

const { hthtPrefix } = varibles
const { SubMenu } = Menu

@withRouter
class Slider extends React.Component {
  renderMenuItems = (data, parentPath = '') => {
    const { match } = this.props
    const { url } = match
    const path = parentPath ? '/' : ''

    return data.map(item => {
      if (item.children) {
        const len = item.children.length
        let checked = false

        for (let i = 0; i < len; i++) {
          if (item.children[i].children) {
            checked = true
            break
          }
        }

        return checked ? (
          <SubMenu
            key={item.path}
            title={
              <span>
                <span>{item.name}</span>
              </span>
            }
          >
            {this.renderMenuItems(item.children, `${item.path}`)}
          </SubMenu>
        ) : (
          <Menu.ItemGroup key={item.path} title={item.name}>
            {this.renderMenuItems(item.children, `${parentPath}/${item.path}`)}
          </Menu.ItemGroup>
        )
      }

      return (
        <Menu.Item key={item.path}>
          <Link to={`${url}${path}${parentPath}/${item.path}`}>{item.name}</Link>
        </Menu.Item>
      )
    })
  }

  render() {
    const { menuConfig } = this.props
    const defaultOpenKeys = menuConfig.filter(item => item.children).map(ele => ele.path)

    return (
      <div id={`${hthtPrefix}-slider`}>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['preface']}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
        >
          {this.renderMenuItems(menuConfig)}
        </Menu>
      </div>
    )
  }
}

export default Slider
