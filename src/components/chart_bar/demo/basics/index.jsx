import React from 'react'
import ChartBar from '../index'

const dataSource ={
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar'
  }]
};


function Basics() {
  return <ChartBar dataSource={dataSource} />
}

export default Basics
