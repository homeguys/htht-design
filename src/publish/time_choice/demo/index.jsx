import React, { Fragment } from 'react'
import { Form, DatePicker } from 'antd'
import WarnBox from '../../utils/warn_box'

function TimeChoice(props) {
  const { form, mode } = props
  // 没传mode或者传horizontal和vertical之外的值，默认是horizontal
  const checked = mode && mode === 'vertical'

  // 没传form的话警告，form必传
  if (!form) {
    return <WarnBox title="请传入form" />
  }

  // 判断横向还是纵向来赋值class名
  const className = checked ? 'htht-time-choice-vertical' : 'htht-time-choice-horizontal'
  const { getFieldDecorator } = form

  return (
    <div className={`htht-time-choice ${className}`}>
      <div className="item">
        {checked ? (
          <span className="title">开始时间：</span>
        ) : (
          <span className="title">时间选择：</span>
        )}
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
        {!checked ? (
          <Fragment>
            <span className="gap">-</span>
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
          </Fragment>
        ) : null}
      </div>
      {checked ? (
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
      ) : null}
    </div>
  )
}

export default TimeChoice
