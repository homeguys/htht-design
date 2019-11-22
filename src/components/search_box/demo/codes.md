```jsx
import React from 'react'
import { Form, DatePicker, Button, Select } from 'antd'

const FormItem = Form.Item
const { Option } = Select

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

class SearchboxHorizontal extends React.Component {
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

  // 提交表单
  handleSubmit = () => {
    const { form } = this.props
    const { getFieldsValue } = form
    console.warn(getFieldsValue())
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { levelOne, levelTwo, levelThree, levelOneArr, levelTwoArr, levelThreeArr } = this.state

    return (
      <div className="htht-search-box htht-search-box-horizontal">
        <Form>
          <div className="htht-time-choice htht-time-choice-horizontal">
            <div className="item">
              <span className="title">时间选择：</span>
              <FormItem>
                {getFieldDecorator('startTime', {
                  rules: [{ required: true, message: '请输入开始时间！' }]
                })(
                  <DatePicker
                    showToday={false}
                    format="YYYY-MM-DD"
                    allowClear={false}
                    style={{ width: '1.4rem' }}
                  />
                )}
              </FormItem>
              <span className="gap">-</span>
              <FormItem>
                {getFieldDecorator('endTime', {
                  rules: [{ required: true, message: '请输入结束时间！' }]
                })(
                  <DatePicker
                    showToday={false}
                    format="YYYY-MM-DD"
                    allowClear={false}
                    style={{ width: '1.4rem' }}
                  />
                )}
              </FormItem>
            </div>
          </div>
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
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'search_box_horizontal' })(SearchboxHorizontal)

```

---

```jsx
import React from 'react'
import { Form, DatePicker } from 'antd'

function VerticalTimeChoice(props) {
  const { form } = props
  const { getFieldDecorator } = form

  return (
    <div className="htht-time-choice htht-time-choice-vertical">
      <div className="item">
        <span className="title">开始时间：</span>
        <Form.Item>
          {getFieldDecorator('startTime', {
            rules: [{ required: true, message: '请输入开始时间！' }]
          })(
            <DatePicker
              showToday={false}
              format="YYYY-MM-DD"
              allowClear={false}
              style={{ width: '1.4rem' }}
            />
          )}
        </Form.Item>
      </div>
      <div className="item">
        <span className="title">结束时间：</span>
        <Form.Item>
          {getFieldDecorator('endTime', {
            rules: [{ required: true, message: '请输入结束时间！' }]
          })(
            <DatePicker
              showToday={false}
              format="YYYY-MM-DD"
              allowClear={false}
              style={{ width: '1.4rem' }}
            />
          )}
        </Form.Item>
      </div>
    </div>
  )
}

export default Form.create({ name: 'time_choice_vertical' })(VerticalTimeChoice)
```
