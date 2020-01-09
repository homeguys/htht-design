import React from 'react'
import { Table, Tag } from 'antd'

class ApiTable extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '参数',
        dataIndex: 'param',
        key: 'param',
        render: value => {
          const className = value === 'API' || value === 'FormKey' ? 'title' : ''
          return <span className={className}>{value}</span>
        }
      },
      {
        title: '说明',
        dataIndex: 'explain',
        key: 'explain'
      },
      {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
        render: tags => (
          <span>
            {Array.isArray(tags) &&
              tags.map((tag, index) => {
                let color
                switch (index) {
                  case 0:
                    color = '#2db7f5'
                    break
                  case 1:
                    color = '#f50'
                    break
                  case 2:
                    color = '#87d068'
                    break
                  default:
                    color = '#2db7f5'
                    break
                }
                return (
                  <Tag color={color} key={index}>
                    {tag}
                  </Tag>
                )
              })}
          </span>
        )
      },
      {
        title: '默认值',
        dataIndex: 'default',
        key: 'default'
      }
    ]
  }

  render() {
    const { dataSource } = this.props
    return (
      <div className="api-container">
        <Table columns={this.columns} dataSource={dataSource} pagination={false} />
      </div>
    )
  }
}

export default ApiTable
