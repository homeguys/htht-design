import React from 'react'
import { Form, DatePicker, Select } from 'antd'
import moment from 'moment' // eslint-disable-line

const { Option } = Select

class VerticalTimeSwitch extends React.Component {
  componentDidMount() {
    const switchBox = document.querySelector('.htht-time-switch-vertical .switch-box')
    switchBox.addEventListener('click', this.switchTime, false)
  }

  componentWillUnmount() {
    switchBox.removeEventListener('click', this.switchTime, false)
  }

  switchTime = e => {
    console.warn(e.target)
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div className="htht-time-switch htht-time-switch-vertical">
        <div className="date-box">
          <div className="item">
            <span className="title">时间选择：</span>
            <Form.Item>
              {getFieldDecorator('day', {
                rules: [{ required: true, message: '请输入开始时间！' }],
                initialValue: moment('2019-11-11', 'YYYY-MM-DD')
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
            <Form.Item>
              {getFieldDecorator('time', {
                rules: [{ required: true, message: '请输入开始时间！' }],
                initialValue: '08'
              })(
                <Select placeholder="请选择下拉" style={{ width: '100%' }}>
                  <Option value="08">08</Option>
                  <Option value="20">20</Option>
                </Select>
              )}
            </Form.Item>
          </div>
        </div>
        <div className="switch-box">
          <span className="iconfont iconbackward" />
          <span className="iconfont iconbackward1" />
          <span className="iconfont iconrecover" />
          <span className="iconfont iconforward1" />
          <span className="iconfont iconforward" />
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'vertical-time-switch' })(VerticalTimeSwitch)
