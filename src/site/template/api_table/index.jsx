/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Table, Divider, Tag } from 'antd'

const columns = [
  {
    title: '参数',
    dataIndex: 'param',
    key: 'param',
    render: text => <a>{text}</a>
  },
  {
    title: '说明',
    dataIndex: 'explain',
    key: 'explain'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    )
  },
  {
    title: '默认值',
    key: 'default',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  },
  {
    title: '版本',
    dataIndex: 'edition',
    key: 'edition'
  }
]

const data = [
  {
    key: '1',
    param: 'John Brown',
    explain: 'New York No. 1 Lake Park',
    type: ['nice', 'developer'],
    default: 32,
    edition: '0.0.5'
  },
  {
    key: '2',
    param: 'Jim Green',
    explain: 'London No. 1 Lake Park',
    type: ['loser'],
    default: 42,
    edition: '0.0.5'
  },
  {
    key: '3',
    param: 'Joe Black',
    explain: 'Sidney No. 1 Lake Park',
    type: ['cool', 'teacher'],
    default: 32,
    edition: '0.0.5'
  }
]

class ApiTable extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="api-table">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    )
  }
}

export default ApiTable
