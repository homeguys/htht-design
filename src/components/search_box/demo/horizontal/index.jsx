import React from 'react'
import { Form } from 'antd'
import Searchbox from '../index'

// 三级联动数据格式
const linkageData = [
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
      {
        value: 'Ningbo',
        name: '宁波市',
        children: [
          {
            value: 'Ninghai',
            name: '宁海县'
          },
          {
            value: 'Xiangshan',
            name: '象山县'
          }
        ]
      }
    ]
  },
  {
    value: 'Anhui',
    name: '安徽省',
    children: [
      {
        value: 'Wuhu',
        name: '芜湖市',
        children: [
          {
            value: 'Wuwei',
            name: '无为县'
          }
        ]
      },
      {
        value: 'Maanshan',
        name: '马鞍山市',
        children: [
          {
            value: 'Hexian',
            name: '和县'
          }
        ]
      }
    ]
  }
]

// 提交表单
function handleSubmit(form) {
  const { getFieldsValue } = form
  console.warn(getFieldsValue())
}

function SearchboxHorizontal(props) {
  const { form } = props

  return (
    <div>
      <Searchbox linkageData={linkageData} form={form} onSubmit={() => handleSubmit(form)} />
    </div>
  )
}

export default Form.create({ name: 'search_box_horizontal' })(SearchboxHorizontal)
