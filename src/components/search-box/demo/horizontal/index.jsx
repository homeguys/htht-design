import React from 'react'
import { Form, DatePicker, InputNumber, Radio, Checkbox, Select } from 'antd'

const FormItem = Form.Item
const { Option } = Select

function SearchboxHorizontal(props) {
  const { form } = props
  const { getFieldDecorator } = form

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
                <InputNumber
                  placeholder="最小经度"
                  min={-180}
                  max={180}
                  style={{ width: '1.4rem' }}
                />
              )}
            </FormItem>
            <span className="gap">-</span>
            <FormItem>
              {getFieldDecorator('maxLong', {
                rules: [{ required: true, message: '请输入最大经度！' }]
              })(
                <InputNumber
                  placeholder="最大经度"
                  min={-180}
                  max={180}
                  style={{ width: '1.4rem' }}
                />
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
              })(
                <InputNumber
                  placeholder="最小纬度"
                  min={-90}
                  max={90}
                  style={{ width: '1.4rem' }}
                />
              )}
            </FormItem>
            <span className="gap">-</span>
            <FormItem>
              {getFieldDecorator('maxLat', {
                rules: [{ required: true, message: '请输入最大纬度！' }]
              })(
                <InputNumber
                  placeholder="最大纬度"
                  min={-90}
                  max={90}
                  style={{ width: '1.4rem' }}
                />
              )}
            </FormItem>
          </div>
        </div>
        <div className="htht-radio-choice htht-radio-choice-horizontal">
          <div className="item">
            <span className="title">单选要素：</span>
            <FormItem>
              {getFieldDecorator('radio-group')(
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
            <span className="title">单选要素：</span>
            <FormItem>
              {getFieldDecorator('radio-group')(
                <Checkbox.Group>
                  <Checkbox value="A">A</Checkbox>
                  <Checkbox value="B">B</Checkbox>
                  <Checkbox value="C">C</Checkbox>
                </Checkbox.Group>
              )}
            </FormItem>
          </div>
        </div>
        <div className="htht-check-choice htht-check-choice-horizontal">
          <div className="item">
            <span className="title">下拉选择：</span>
            <FormItem>
              {getFieldDecorator('radio-group')(
                <Select placeholder="Please select favourite colors">
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
  )
}

export default Form.create({ name: 'search_box_horizontal' })(SearchboxHorizontal)
