import React from 'react'
import ChartLine from '../index'

const dataSource = {
  xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  seriesData: [820, 932, 901, 934, 1290, 1330, 1320]
}

function Basics() {
  return (
    <div className="basic-pie-demo">
      <ChartLine dataSource={dataSource} />
    </div>
  )
}

export default Basics
