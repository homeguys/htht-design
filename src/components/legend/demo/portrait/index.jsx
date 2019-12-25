import React from 'react'


import Legend from '../index'

const dataSource = {
  isHorizontal: false,
  isLableOnLine: false,
  title: '温度（℃）',
  value: [1, 2, 3, 4,5],
  valueMaxLength: 1,
  color: ['rgba(200,200,200,1)', 'rgba(190,190,190,1)', 'rgba(130,130,130,1)', 'rgba(60,60,60,1)', 'rgba(0,0,0,1)'],
};

function LegendPortrait() {
  return <Legend dataSource={dataSource}/>
}

export default LegendPortrait
