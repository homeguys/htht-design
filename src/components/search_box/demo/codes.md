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
<div className="htht-search-box htht-search-box-vertical">
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
    <div className="htht-space-choice htht-space-choice-two-line">
      <span className="title">空间选择：</span>
      <div className="item">
        <span className="sub-title">
          <i>经度</i>
        </span>
        <FormItem>
          {getFieldDecorator('minLong', {
            rules: [{ required: true, message: '请输入最小经度！' }]
          })(
            <InputNumber placeholder="最小经度" min={-180} max={180} style={{ width: '1.4rem' }} />
          )}
        </FormItem>
        <span className="gap">-</span>
        <FormItem>
          {getFieldDecorator('maxLong', {
            rules: [{ required: true, message: '请输入最大经度！' }]
          })(
            <InputNumber placeholder="最大经度" min={-180} max={180} style={{ width: '1.4rem' }} />
          )}
        </FormItem>
      </div>

      <div className="item">
        <span className="sub-title">
          <i>纬度</i>
        </span>
        <FormItem>
          {getFieldDecorator('minLat', {
            rules: [{ required: true, message: '请输入最小纬度！' }]
          })(<InputNumber placeholder="最小纬度" min={-90} max={90} style={{ width: '1.4rem' }} />)}
        </FormItem>
        <span className="gap">-</span>
        <FormItem>
          {getFieldDecorator('maxLat', {
            rules: [{ required: true, message: '请输入最大纬度！' }]
          })(<InputNumber placeholder="最大纬度" min={-90} max={90} style={{ width: '1.4rem' }} />)}
        </FormItem>
      </div>
    </div>
    <div className="htht-radio-choice htht-radio-choice-horizontal">
      <div className="item">
        <span className="title">单选要素：</span>
        <FormItem>
          {getFieldDecorator('radioGroup')(
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          )}
        </FormItem>
      </div>
    </div>
    <div className="htht-check-choice htht-check-choice-horizontal">
      <div className="item">
        <span className="title">多选要素：</span>
        <FormItem>
          {getFieldDecorator('checkedGroup')(
            <Checkbox.Group>
              <Checkbox value="A">A</Checkbox>
              <Checkbox value="B">B</Checkbox>
              <Checkbox value="C">C</Checkbox>
              <Checkbox value="D">D</Checkbox>
              <Checkbox value="E">E</Checkbox>
            </Checkbox.Group>
          )}
        </FormItem>
      </div>
    </div>
    <div className="htht-select-choice">
      <div className="item">
        <span className="title">下拉选择：</span>
        <FormItem>
          {getFieldDecorator('selectGroup')(
            <Select placeholder="请选择下拉" style={{ width: '100%' }}>
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>
      </div>
    </div>
  </Form>
</div>
```
