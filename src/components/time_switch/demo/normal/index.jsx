import React from 'react'
import { Form } from 'antd'
import TimeSwitch from '../index'

const times = ['08', '20'] // 时次数组

function TimeSwitchDemo(props) {
  const { form } = props
  return (
    <div style={{ width: '4rem' }}>
      <Form>
        <TimeSwitch form={form} times={times} />
      </Form>
    </div>
  )
}

export default Form.create({ name: 'vertical-time-switch' })(TimeSwitchDemo)
