import React from 'react'
import { Form, Select } from 'antd'

const { Option } = Select
const FormItem = Form.Item

class LinkageSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      levelOne: props.dataSource[0].value,
      levelTwo: props.dataSource[0].children[0].value,
      levelThree: props.dataSource[0].children[0].children[0].value,
      levelOneArr: props.dataSource,
      levelTwoArr: props.dataSource[0].children,
      levelThreeArr: props.dataSource[0].children[0].children
    }
  }

  // 三级联动切换
  handlelevelChange = (type, value) => {
    const { form, dataSource } = this.props
    const { setFieldsValue } = form

    if (type === 'levelOne') {
      dataSource.forEach(item => {
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

export default LinkageSelect
