```jsx
import React from 'react'
import ChartLine from '../index'

const dataSource = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
}

function Basics() {
  return <ChartLine dataSource={dataSource}/>
}

export default Basics

```
