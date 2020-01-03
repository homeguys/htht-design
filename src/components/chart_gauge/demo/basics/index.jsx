import React from 'react'
import ChartGauge from '../index'

const color = '#f7872f'
const value = 30

function Basics() {
  return (
    <div className="basic-pie-demo">
      <ChartGauge value={value} color={color} />
    </div>
  )
}

export default Basics
