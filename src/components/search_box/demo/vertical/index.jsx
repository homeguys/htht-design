import React from 'react'
import { Form } from 'antd'
import Searchbox from '../index'

const radioData = [
  {
    name: 'item 1',
    value: 'a'
  },
  {
    name: 'item 2',
    value: 'b'
  },
  {
    name: 'item 3',
    value: 'c'
  }
]
const checkboxData = [
  {
    name: 'A',
    value: 'A'
  },
  {
    name: 'B',
    value: 'B'
  },
  {
    name: 'C',
    value: 'C'
  }
]
const selectData = [
  {
    name: 'A',
    value: 'A'
  },
  {
    name: 'B',
    value: 'B'
  },
  {
    name: 'C',
    value: 'C'
  }
]

// 提交表单
function handleSubmit(form) {
  const { getFieldsValue } = form
  console.warn(getFieldsValue())
}

function SearchboxDemo(props) {
  const { form } = props

  return (
    <div style={{ width: '4rem' }}>
      <Searchbox
        form={form}
        mode="vertical"
        radioData={radioData}
        checkboxData={checkboxData}
        selectData={selectData}
        onSubmit={() => handleSubmit(form)}
      />
    </div>
  )
}

export default Form.create({ name: 'search_box' })(SearchboxDemo)
