import React from 'react'
import { Form, Select } from 'antd'

const { Option } = Select
const FormItem = Form.Item

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

class LinkageSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      levelOne: data[0].value,
      levelTwo: data[0].children[0].value,
      levelThree: data[0].children[0].children[0].value,
      levelOneArr: data,
      levelTwoArr: data[0].children,
      levelThreeArr: data[0].children[0].children
    }
  }

  // 三级联动切换
  handlelevelChange = (type, value) => {
    const { form } = this.props
    const { setFieldsValue } = form

    if (type === 'levelOne') {
      data.forEach(item => {
        if (item.value === value) {
          setFieldsValue({
            levelOne: item.value,
            levelTwo: item.children[0].value,
            levelThree: item.children[0].children[0].value
          })

          this.setState({
            levelTwoArr: item.children,
            levelThreeArr: item.children[0].children
          })
        }
      })
    } else if (type === 'levelTwo') {
      const { levelTwoArr } = this.state
      levelTwoArr.forEach(item => {
        if (item.value === value) {
          setFieldsValue({
            levelTwo: item.value,
            levelThree: item.children[0].value
          })

          this.setState({
            levelThreeArr: item.children
          })
        }
      })
    } else {
      setFieldsValue({
        levelThree: value
      })
    }
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { levelOne, levelTwo, levelThree, levelOneArr, levelTwoArr, levelThreeArr } = this.state

    return (
      <div className="htht-linkage-select">
        <div className="item">
          <span className="title">省：</span>
          <FormItem>
            {getFieldDecorator('levelOne', {
              rules: [{ required: true, message: '请输入省！' }],
              initialValue: levelOne
            })(
              <Select
                style={{ width: 120 }}
                onChange={value => {
                  this.handlelevelChange('levelOne', value)
                }}
              >
                {levelOneArr.map(item => (
                  <Option key={item.value}>{item.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </div>
        <div className="item">
          <span className="title">市：</span>
          <FormItem>
            {getFieldDecorator('levelTwo', {
              rules: [{ required: true, message: '请输入市！' }],
              initialValue: levelTwo
            })(
              <Select
                style={{ width: 120 }}
                onChange={value => {
                  this.handlelevelChange('levelTwo', value)
                }}
              >
                {levelTwoArr.map(item => (
                  <Option key={item.value}>{item.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </div>
        <div className="item">
          <span className="title">县：</span>
          <FormItem>
            {getFieldDecorator('levelThree', {
              rules: [{ required: true, message: '请输入县！' }],
              initialValue: levelThree
            })(
              <Select
                style={{ width: 120 }}
                onChange={value => {
                  this.handlelevelChange('levelThree', value)
                }}
              >
                {levelThreeArr.map(item => (
                  <Option key={item.value}>{item.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'linkage' })(LinkageSelect)
