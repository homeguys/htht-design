import React from 'react'
import ChartPie from '../index'

const dataSource = [
  { value: 335, name: '直接访问' },
  { value: 310, name: '邮件营销' },
  { value: 274, name: '联盟广告' },
  { value: 235, name: '视频广告' },
  { value: 400, name: '搜索引擎' }
]

function normalPie() {
  const option = {
    title: {
      text: '普通饼图'
    },
    color: ['#407fff', '#e15d68', '#00cccd', '#fea763', '#04b71d'],
    series: [
      {
        roseType: false
      }
    ]
  }

  return (
    <div className="basic-pie-demo">
      <ChartPie dataSource={dataSource} option={option} />
    </div>
  )
}

export default normalPie
