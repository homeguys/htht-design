/* eslint-disable react/no-unused-state */
import React from 'react'
import { Form, Select } from 'antd'
import WarnBox from '../../utils/warn_box'

const { Option } = Select
const FormItem = Form.Item

class LinkageSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      levelOne: '',
      levelTwo: '',
      levelThree: '',
      levelOneArr: [],
      levelTwoArr: [],
      levelThreeArr: [],
      dataSource: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { dataSource } = nextProps
    if ('dataSource' in nextProps && nextProps.dataSource !== prevState.dataSource) {
      if (!Array.isArray(dataSource) || dataSource.length === 0) {
        return {
          dataSource: []
        }
      }
      return {
        dataSource,
        levelOne: dataSource[0].value,
        levelTwo: dataSource[0].children[0].value,
        levelThree: dataSource[0].children[0].children[0].value,
        levelOneArr: dataSource,
        levelTwoArr: dataSource[0].children,
        levelThreeArr: dataSource[0].children[0].children
      }
    }
    return prevState
  }

  // 三级联动切换
  handlelevelChange = (type, value) => {
    const { form, dataSource } = this.props
    const { setFieldsValue } = form

    if (type === 'province') {
      dataSource.forEach(item => {
        if (item.value === value) {
          setFieldsValue({
            province: item.value,
            city: item.children[0].value,
            county: item.children[0].children[0].value
          })

          this.setState({
            levelTwoArr: item.children,
            levelThreeArr: item.children[0].children
          })
        }
      })
    } else if (type === 'city') {
      const { levelTwoArr } = this.state
      levelTwoArr.forEach(item => {
        if (item.value === value) {
          setFieldsValue({
            city: item.value,
            county: item.children[0].value
          })

          this.setState({
            levelThreeArr: item.children
          })
        }
      })
    } else {
      setFieldsValue({
        county: value
      })
    }
  }

  render() {
    const { form } = this.props

    // 没传form的话警告，form必传
    if (!form) {
      return <WarnBox title="请传入form" />
    }

    const { getFieldDecorator } = form
    const { levelOne, levelTwo, levelThree, levelOneArr, levelTwoArr, levelThreeArr } = this.state

    return (
      <div className="htht-linkage-select">
        <div className="item">
          <span className="title">省：</span>
          <FormItem>
            {getFieldDecorator('province', {
              rules: [{ required: true, message: '请输入省！' }],
              initialValue: levelOne
            })(
              <Select
                style={{ width: 120 }}
                onChange={value => {
                  this.handlelevelChange('province', value)
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
            {getFieldDecorator('city', {
              rules: [{ required: true, message: '请输入市！' }],
              initialValue: levelTwo
            })(
              <Select
                style={{ width: 120 }}
                onChange={value => {
                  this.handlelevelChange('city', value)
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
            {getFieldDecorator('county', {
              rules: [{ required: true, message: '请输入县！' }],
              initialValue: levelThree
            })(
              <Select
                style={{ width: 120 }}
                onChange={value => {
                  this.handlelevelChange('county', value)
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
