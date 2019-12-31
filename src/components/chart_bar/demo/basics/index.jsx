import React from 'react'
import ChartBar from '../index'

const dataSource = [120, 200, 150, 80, 70, 110, 130]

function Basics() {
  return (
    <div className="basic-pie-demo">
      <ChartBar dataSource={dataSource} />
    </div>
  )
}

export default Basics
