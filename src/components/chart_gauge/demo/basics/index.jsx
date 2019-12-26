import React from 'react'
import ChartGauge from '../index'

const dataSource = {
  tooltip : {
    formatter: "{a} <br/>{b} : {c}%"
  },
  toolbox: {
    feature: {
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '业务指标',
      type: 'gauge',
      detail: {formatter:'{value}%'},
      data: [{value: 50, name: '完成率'}]
    }
  ]
};

function Basics() {
  return <ChartGauge dataSource={dataSource} />
}

export default Basics
