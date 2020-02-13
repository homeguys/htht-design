```jsx
import React from 'react'
import ChartGauge from '../index'

const color = '#f7872f'
const value = 50

function Basics() {
  return (
    <div className="basic-pie-demo">
      <ChartGauge value={value} color={color} />
    </div>
  )
}

export default Basics
```
