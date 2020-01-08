import React from 'react'
import { Form } from 'antd'
import VerticalTimeSwitch from '../index'

const times = ['08', '20'] // 时次数组

function VerticalTimeSwitchDemo(props) {
  const { form } = props

  return (
    <Form>
      <VerticalTimeSwitch form={form} times={times} />
    </Form>
  )
}

export default Form.create({ name: 'vertical-time-switch' })(VerticalTimeSwitchDemo)
