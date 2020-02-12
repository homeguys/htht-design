/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, DatePicker, Select, message } from 'antd'
import moment from 'moment'
import { toast, getParents } from '../../common/utils'
import WarnBox from '../../common/warn_box'

const { Option } = Select

class TimeSwitch extends React.Component {
  constructor (props) {
    super(props)
    this.date = new Date()
  }

  componentDidMount () {
    const switchBox = document.querySelector('.htht-time-switch-vertical .switch-box')
    if (switchBox) {
      switchBox.addEventListener('click', this.switchTime, false)
    }
  }

  componentWillUnmount () {
    const switchBox = document.querySelector('.htht-time-switch-vertical .switch-box')
    if (switchBox) {
      switchBox.removeEventListener('click', this.switchTime, false)
    }
  }

  // 手动选择时间
  handleChangeDate = e => {
    const { form } = this.props
    const { setFieldsValue } = form
    setFieldsValue({ date: e })
  }

  // 快速切换时间
  switchTime = e => {
    const { className } = e.target

    if (className === 'switch-box') return
    const current = getParents(e.target, '.iconfont')
    const { form, times } = this.props
    const { setFieldsValue, getFieldValue } = form
    const currentDay = getFieldValue('switch_date').valueOf()
    const currentTime = getFieldValue('switch_time')
    let currentClassName = current.className
    let timeIndex = times && times.indexOf(currentTime)

    currentClassName = currentClassName.replace(/iconfont /, '')

    switch (currentClassName) {
      case 'icon_pre_day': {
        const newTime = currentDay - 24 * 60 * 60 * 1000
        const newDate = new Date(newTime)
        setFieldsValue({ switch_date: moment(newDate, 'YYYY-MM-DD') })
        break
      }
      case 'icon_pre_time': {
        if (timeIndex !== 0 && !timeIndex) {
          toast(message, '请传入时次', 'info')
          return
        }
        timeIndex -= 1
        if (timeIndex < 0) {
          toast(message, '已经是最小时次', 'info')
          return
        }
        setFieldsValue({ switch_time: times[timeIndex] })
        break
      }

      case 'icon_recover':
        setFieldsValue({
          switch_date: moment(this.date, 'YYYY-MM-DD'),
          switch_time: times && times[0]
        })
        break
      case 'icon_next_time': {
        if (timeIndex !== 0 && !timeIndex) {
          toast(message, '请传入时次', 'info')
          return
        }
        timeIndex += 1
        if (timeIndex >= times.length) {
          toast(message, '已经是最大时次', 'info')
          return
        }
        setFieldsValue({ switch_time: times[timeIndex] })
        break
      }
      case 'icon_next_day': {
        const newTime = currentDay + 24 * 60 * 60 * 1000
        if (newTime > new Date().getTime()) {
          toast(message, '日期不能超过今天', 'info')
          return
        }
        const newDate = new Date(newTime)
        setFieldsValue({ switch_date: moment(newDate, 'YYYY-MM-DD') })
        break
      }
      default:
        break
    }
  }

  render () {
    const { form, times = [] } = this.props

    // 没传form的话警告，form必传
    if (!form) {
      return <WarnBox title='请传入form' />
    }

    const { getFieldDecorator } = form

    return (
      <div className='htht-time-switch htht-time-switch-vertical'>
        <div className='date-box'>
          <div className='item'>
            <span className='title'>时间选择：</span>
            <Form.Item>
              {getFieldDecorator('switch_date', {
                rules: [{ required: true, message: '请输入开始时间！' }],
                initialValue: moment(this.date, 'YYYY-MM-DD')
              })(
                <DatePicker
                  showToday={false}
                  format='YYYY-MM-DD'
                  allowClear={false}
                  onChange={this.handleChangeDate}
                />
              )}
            </Form.Item>
          </div>
          <div className='item'>
            <Form.Item>
              {getFieldDecorator('switch_time', {
                rules: [{ required: true, message: '请输入时次！' }],
                initialValue: times[0] // 默认选中时次数组第一个
              })(
                <Select placeholder='请选择下拉' style={{ width: '100%' }}>
                  {times.map(item => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </div>
        </div>
        <div className='switch-box'>
          <span className='iconfont icon_pre_day' title='前一天'>
            <svg viewBox='0 0 1024 1024' width='18' height='18'>
              <path
                d='M734 153c6-6 11.1-8.1 15.2-6.2 4.1 1.9 6.2 7 6.20000001 15.2L755.40000001 862c0 8.20000001-2.1 13.3-6.20000001 15.2s-9.2-0.2-15.2-6.2l-337.6-337.6c-2.9-2.9-4.9-5.9-6.2-9L390.2 846.8c0 8.20000001-2.99999999 15.4-9 21.4s-13.09999999 9-21.4 9L299 877.2c-8.20000001 0-15.4-2.99999999-21.4-9s-9-13.2-9-21.4l0-669.5c0-8.20000001 2.99999999-15.4 9-21.4s13.2-9 21.4-9l60.9 0c8.20000001 0 15.4 2.99999999 21.4 9s9 13.2 9 21.4L390.3 499.7c1.30000001-3.2 3.3-6.2 6.2-9L734 153z'
                fill='#333'
              />
            </svg>
          </span>
          <span className='iconfont icon_pre_time' title='前一时次'>
            <svg viewBox='0 0 1024 1024' width='18' height='18'>
              <path
                d='M857.2 153c6-6 11.1-8.1 15.2-6.2 4.1 1.9 6.2 7 6.2 15.2L878.6 862c0 8.20000001-2.1 13.3-6.2 15.2-4.1 1.9-9.2-0.2-15.2-6.2l-337.6-337.6c-2.9-2.9-4.9-5.9-6.2-9L513.4 862c0 8.20000001-2.1 13.3-6.2 15.2-4.1 1.9-9.2-0.2-15.2-6.2l-337.6-337.6c-6-6-9-13.2-9-21.4s2.99999999-15.4 9-21.4L492 153c6-6 11.1-8.1 15.2-6.2 4.1 1.9 6.2 7 6.2 15.2L513.4 499.70000001c1.30000001-3.2 3.3-6.2 6.2-9.00000001L857.2 153z'
                fill='#333'
              />
            </svg>
          </span>
          <span className='iconfont icon_recover' title='恢复'>
            <svg viewBox='0 0 1024 1024' width='18' height='18'>
              <path
                d='M785.42434169 597.16362208S706.10548597 872.19557483 500.73031871 750.63324903c0 0-66.0615963-31.90730189-94.37370973-131.44909536l122.46112309-97.96889817L141.21142578 456.95125381v373.00085094l112.34965422-97.96889818A399.51536976 399.51536976 0 0 0 571.28590148 882.75644234c208.97035645-4.26928716 229.1932942-193.91550245 214.13844021-285.59282026zM400.06502862 426.16744855S479.60858367 150.91079646 685.88254822 272.69782087c0 0 66.0615963 31.68260256 94.37370972 131.44909533L658.01983419 501.89111506l386.48280966 64.48870174V193.37896514l-112.34965422 97.74419887A400.18946772 400.18946772 0 0 0 614.42816814 141.24872551c-208.97035645 3.59518919-229.1932942 193.24140519-214.36313951 284.91872304z'
                fill='#333'
              />
            </svg>
          </span>
          <span className='iconfont icon_next_time' title='后一时次'>
            <svg viewBox='0 0 1024 1024' width='18' height='18'>
              <path
                d='M166.8 871c-6 6-11.1 8.1-15.2 6.2-4.1-1.9-6.2-7-6.2-15.2V162c0-8.2 2.1-13.3 6.2-15.2 4.1-1.9 9.2 0.2 15.2 6.2l337.6 337.6c2.9 2.9 4.9 5.9 6.2 9V162c0-8.2 2.1-13.3 6.2-15.2 4.1-1.9 9.2 0.2 15.2 6.2l337.6 337.6c6 6 9 13.2 9 21.4s-3 15.4-9 21.4L532 871c-6 6-11.1 8.1-15.2 6.2-4.1-1.9-6.2-7-6.2-15.2V524.3c-1.3 3.2-3.3 6.2-6.2 9L166.8 871z'
                fill='#333'
              />
            </svg>
          </span>
          <span className='iconfont icon_next_day' title='后一天'>
            <svg viewBox='0 0 1024 1024' width='18' height='18'>
              <path
                d='M290 871c-6 6-11.1 8.1-15.2 6.2-4.1-1.9-6.2-7-6.20000001-15.2L268.59999999 162c0-8.20000001 2.1-13.3 6.20000001-15.2s9.2 0.2 15.2 6.2l337.6 337.6c2.9 2.9 4.9 5.9 6.2 9L633.8 177.2c0-8.20000001 2.99999999-15.4 9-21.4s13.09999999-9 21.4-9L725 146.8c8.20000001 0 15.4 2.99999999 21.4 9s9 13.2 9 21.4l0 669.5c0 8.20000001-2.99999999 15.4-9 21.4s-13.2 9-21.4 9l-60.9 0c-8.20000001 0-15.4-2.99999999-21.4-9s-9-13.2-9-21.4L633.7 524.3c-1.30000001 3.2-3.3 6.2-6.2 9L290 871z'
                fill='#333'
              />
            </svg>
          </span>
        </div>
      </div>
    )
  }
}

export default TimeSwitch
