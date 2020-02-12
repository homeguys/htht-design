import React from 'react'
import ChartPie from '../index'

const dataSource = [
  {
    value: 100,
    name: '分钟数据文件'
  },
  {
    value: 100,
    name: '表层海水温度'
  },
  {
    value: 100,
    name: '表层海水盐度'
  },
  {
    value: 100,
    name: '历时潮汐'
  },
  {
    value: 100,
    name: '一分钟潮汐'
  },
  {
    value: 100,
    name: '气温'
  },
  {
    value: 100,
    name: '气压'
  },
  {
    value: 100,
    name: '降水量'
  },
  {
    value: 100,
    name: '能见度'
  },
  {
    value: 100,
    name: '相对湿度'
  },
  {
    value: 100,
    name: '风向'
  },
  {
    value: 100,
    name: '风速风向'
  },
  {
    value: 100,
    name: '海浪特征值'
  }
]

function ColorfulPie () {
  const option = {
    title: {
      text: '多彩饼图'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
    },
    legend: {
      orient: 'vertical',
      left: 20,
      bottom: 20,
      padding: 0,
      itemGap: 5,
      itemWidth: 48,
      itemHeight: 15,
      textStyle: {
        color: '#7090C8',
        fontSize: 13
      },
      data: [
        '分钟数据文件',
        '表层海水温度',
        '表层海水盐度',
        '历时潮汐',
        '一分钟潮汐',
        '气温',
        '气压',
        '降水量',
        '能见度',
        '相对湿度',
        '风向',
        '风速风向',
        '海浪特征值'
      ]
    },
    series: [
      {
        name: '接受数据总数',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['60%', '55%'],
        color: [
          '#E13021',
          '#762174',
          '#1F0F6B',
          '#255A9D',
          '#4192D8',
          '#41928C',
          '#409045',
          '#7DB744',
          '#FEF751',
          '#ECBC3F',
          '#E08D37',
          '#D4672B',
          '#D4686B'
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          normal: {
            textStyle: {
              fontSize: 14,
              color: '#7090c8'
            }
          }
        }
      }
    ]
  }

  return (
    <div className='basic-pie-demo'>
      <ChartPie dataSource={dataSource} option={option} />
    </div>
  )
}

export default ColorfulPie
