```jsx
import React from 'react'
import { Form } from 'antd'
import LinkageSelect from '../index'

// 三级联动数据格式
const data = [
  {
    value: 'Zhejiang',
    name: '浙江省',
    children: [
      {
        value: 'Hangzhou',
        name: '杭州市',
        children: [
          {
            value: 'Yuhang',
            name: '余杭区'
          },
          {
            value: 'Gongshu',
            name: '拱墅区'
          }
        ]
      },
      ...
    ]
  },
  ...
]

function LinkageSelectDemo(props) {
  const { form } = props

  return (
    <Form>
      <LinkageSelect form={form} dataSource={dataSource} />
    </Form>
  )
}

export default Form.create({ name: 'linkage' })(LinkageSelectDemo)
```
