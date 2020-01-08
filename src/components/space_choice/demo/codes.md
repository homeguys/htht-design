```jsx
import React from 'react'
import { Form } from 'antd'
import SpaceChoice from '../index'

function SpaceChoiceNormal(props) {
  const { form } = props

  return (
    <Form>
      <SpaceChoice form={form} />
    </Form>
  )
}

export default Form.create({ name: 'space_choice_normal' })(SpaceChoiceNormal)
```
