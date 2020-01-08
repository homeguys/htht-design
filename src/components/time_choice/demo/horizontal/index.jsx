import React from 'react'
import { Form } from 'antd'
import TimeChoice from '../index'

function HorizontalTimeChoice(props) {
  const { form } = props

  return (
    <Form>
      <TimeChoice form={form} />
    </Form>
  )
}

export default Form.create({ name: 'time_choice_horizontal' })(HorizontalTimeChoice)
