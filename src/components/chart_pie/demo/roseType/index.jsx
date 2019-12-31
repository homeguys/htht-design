import React from 'react'
import ChartPie from '../index'

const dataSource = [
  { value: 335, name: '直接访问' },
  { value: 310, name: '邮件营销' },
  { value: 274, name: '联盟广告' },
  { value: 235, name: '视频广告' },
  { value: 400, name: '搜索引擎' }
]

function RoseType() {
  const option = {
    title: {
      text: '南丁格尔图'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    }
  }

  return (
    <div className="basic-pie-demo">
      <ChartPie dataSource={dataSource} option={option} />
    </div>
  )
}

export default RoseType
