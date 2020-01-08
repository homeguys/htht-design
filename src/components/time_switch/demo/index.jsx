import React from 'react'
import { Form, DatePicker, Select, message } from 'antd'
import moment from 'moment' // eslint-disable-line
import { toast } from '../../../utils/utils'

const { Option } = Select

class VerticalTimeSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.date = new Date()
  }

  componentDidMount() {
    const switchBox = document.querySelector('.htht-time-switch-vertical .switch-box')
    switchBox.addEventListener('click', this.switchTime, false)
  }

  componentWillUnmount() {
    const switchBox = document.querySelector('.htht-time-switch-vertical .switch-box')
    switchBox.removeEventListener('click', this.switchTime, false)
  }

  // 手动选择时间
  handleChangeDate = e => {
    const { form } = this.props
    const { setFieldsValue } = form
    setFieldsValue({ day: e })
  }

  // 快速切换时间
  switchTime = e => {
    let { className } = e.target
    const { form, times } = this.props
    const { setFieldsValue, getFieldValue } = form
    const currentDay = getFieldValue('day').valueOf()
    const currentTime = getFieldValue('time')
    let timeIndex = times.indexOf(currentTime)
    className = className.replace(/iconfont /, '')

    switch (className) {
      case 'icon_pre_day': {
        const newTime = currentDay - 24 * 60 * 60 * 1000
        const newDate = new Date(newTime)
        setFieldsValue({ day: moment(newDate, 'YYYY-MM-DD') })
        break
      }
      case 'icon_pre_time': {
        timeIndex -= 1
        if (timeIndex < 0) {
          toast(message, '已经是最小时次', 'info')
          return
        }
        setFieldsValue({ time: times[timeIndex] })
        break
      }

      case 'icon_recover':
        setFieldsValue({ day: moment(this.date, 'YYYY-MM-DD'), time: times[0] })
        break
      case 'icon_next_time': {
        timeIndex += 1
        if (timeIndex >= times.length) {
          toast(message, '已经是最大时次', 'info')
          return
        }
        setFieldsValue({ time: times[timeIndex] })
        break
      }
      case 'icon_next_day': {
        const newTime = currentDay + 24 * 60 * 60 * 1000
        if (newTime > new Date().getTime()) {
          toast(message, '日期不能超过今天', 'info')
          return
        }
        const newDate = new Date(newTime)
        setFieldsValue({ day: moment(newDate, 'YYYY-MM-DD') })
        break
      }
      default:
        break
    }
  }

  render() {
    const { form, times } = this.props
    const { getFieldDecorator } = form

    return (
      <div className="htht-time-switch htht-time-switch-vertical">
        <div className="date-box">
          <div className="item">
            <span className="title">时间选择：</span>
            <Form.Item>
              {getFieldDecorator('day', {
                rules: [{ required: true, message: '请输入开始时间！' }],
                initialValue: moment(this.date, 'YYYY-MM-DD')
              })(
                <DatePicker
                  showToday={false}
                  format="YYYY-MM-DD"
                  allowClear={false}
                  style={{ width: '1.4rem' }}
                  onChange={this.handleChangeDate}
                />
              )}
            </Form.Item>
          </div>
          <div className="item">
            <Form.Item>
              {getFieldDecorator('time', {
                rules: [{ required: true, message: '请输入时次！' }],
                initialValue: times[0] // 默认选中时次数组第一个
              })(
                <Select placeholder="请选择下拉" style={{ width: '100%' }}>
                  {times.map(item => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </div>
        </div>
        <div className="switch-box">
          <span className="iconfont icon_pre_day" title="前一天" />
          <span className="iconfont icon_pre_time" title="前一时次" />
          <span className="iconfont icon_recover" title="恢复" />
          <span className="iconfont icon_next_time" title="后一时次" />
          <span className="iconfont icon_next_day" title="后一天" />
        </div>
      </div>
    )
  }
}

export default VerticalTimeSwitch
