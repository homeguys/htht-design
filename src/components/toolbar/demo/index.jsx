import React from 'react'
import { Dropdown, Icon, Menu, Cascader } from 'antd'
import { getParents, createHash } from '../../../utils/utils'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.hash = createHash(6)
  }

  componentDidMount() {
    const toolbarList = document.getElementsByClassName(`toolbar-list-${this.hash}`)[0]
    /**
     * 工具栏一级目录所有click事件
     */
    toolbarList.addEventListener('click', this.toolbarMethod, false)
  }

  componentWillUnmount() {
    const toolbarList = document.getElementsByClassName(`toolbar-list-${this.hash}`)[0]
    toolbarList.removeEventListener('click', this.toolbarMethod)
  }

  // 组装下拉元素
  getMenu(data) {
    return (
      <Menu onClick={this.dropdownClick}>
        {data.map(item => (
          <Menu.Item key={item.value}>{item.name}</Menu.Item>
        ))}
      </Menu>
    )
  }

  // 工具栏方法集
  toolbarMethod = e => {
    // const { baseMap } = this.props
    const target = getParents(e.target, 'LI')
    if (target && target.tagName === 'LI') {
      const { className } = target
      switch (className) {
        case 'zoomOut':
          console.warn('放大')
          break
        case 'zoomIn':
          console.warn('缩小')
          break
        case 'recover':
          console.warn('恢复')
          break
        case 'probe':
          console.warn('探针')
          break
        default:
          break
      }
    }
  }

  // 工具栏下拉方法集
  dropdownClick = e => {
    /**
     * 工具栏下拉所有click事件
     */
    // const { baseMap } = this.props
    switch (e.key) {
      case 'st':
        console.warn('影像图')
        break
      case 'road':
        console.warn('交通图')
        break
      case 'terrain':
        console.warn('地形图')
        break
      case 'distance':
        console.warn('测量距离')
        break
      case 'area':
        console.warn('测量面积')
        break
      case 'clear':
        console.warn('清除测量')
        break
      default:
        break
    }
  }

  render() {
    const { dataSource, options, hasRegion, position } = this.props
    let list = []
    const data = dataSource
      ? dataSource.map(item => {
          return !item.children ? (
            <li key={item.name} className={item.value}>
              {item.icon}
              <span>{item.name}</span>
            </li>
          ) : (
            <li key={item.name}>
              {item.icon}
              <Dropdown
                overlay={this.getMenu(item.children)}
                trigger={['click']}
                placement="bottomCenter"
              >
                <span>
                  {item.name} <Icon type="down" />
                </span>
              </Dropdown>
            </li>
          )
        })
      : []

    const cascader = [
      <li key="cascader">
        <Cascader options={options} onChange={this.onChange} placeholder="请选择" />
      </li>
    ]

    const style = position === 'left' ? { left: '0.6rem' } : { right: '0.6rem' }

    if (!dataSource || dataSource.length === 0) {
      list.push(<li>暂无数据</li>)
    } else if (dataSource && hasRegion) {
      list = [...cascader, ...data]
    } else {
      list = data
    }
    return (
      <div className="htht-toolbar" style={style}>
        <ul className={`toolbar-list toolbar-list-${this.hash}`}>{list}</ul>
      </div>
    )
  }
}

export default Toolbar
