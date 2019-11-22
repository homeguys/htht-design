/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    align: 'center',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    align: 'center',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    dataIndex: 'oprate',
    align: 'center',
    key: 'oprate',
    render: (text, record, index) => {
      return (
        <div className="opetates">
          <span
            className="iconfont iconchakan"
            onClick={e => this.clickImgBtn(e, record, index)}
            title="修改"
          />
          <span
            className="iconfont icondownload"
            onClick={e => this.addGridLayer(e, record)}
            title="查看"
          />
          <span
            className="iconfont icondelete"
            onClick={e => this.addGridLayer(e, record)}
            title="删除"
          />
        </div>
      )
    }
  }
]

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
]

class TableList extends React.Component {
  constructor(props) {
    super(props)
    this.pageSize = 8
  }

  // 分页点击
  onPageChangePage = () => {}

  // 点击表格行
  clickRow = () => {}

  render() {
    const total = dataSource.length

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.warn(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      onSelect: (record, selected, selectedRows) => {
        console.warn(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.warn(selected, selectedRows, changeRows)
      }
    }
    return (
      <div className="htht-list htht-table-list">
        <Table
          rowKey={record => record.key}
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          pagination={{
            total,
            pageSize: this.pageSize,
            current: 1,
            showQuickJumper: true,
            onChange: this.onPageChangePage.bind(this)
          }}
          onRow={record => {
            // 表格行点击事件
            return {
              onClick: e => this.clickRow(e, record)
            }
          }}
        />
      </div>
    )
  }
}

export default TableList
