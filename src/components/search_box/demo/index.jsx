import React, { Fragment } from 'react'
import { Form, Radio, Checkbox, Select, Button } from 'antd'
import TimeChoice from '../../time_choice/demo'
import SpaceChoice from '../../space_choice/demo'
import LinkageSelect from '../../linkage_select/demo'
import WarnBox from '../../common/warn_box'

const FormItem = Form.Item
const { Option } = Select

function SearchBox (props) {
  const {
    form,
    mode,
    dataSource,
    radioData = [],
    checkboxData = [],
    selectData = [],
    onSubmit
  } = props
  // 没传mode或者传horizontal和vertical之外的值，默认是horizontal
  const checked = mode && mode === 'vertical'

  // 没传form的话警告，form必传
  if (!form) {
    return <WarnBox title='请传入form' />
  }

  // 判断横向还是纵向来赋值class名
  const className = checked ? 'htht-search-box-vertical' : 'htht-search-box-horizontal'

  const { getFieldDecorator } = form

  return (
    <div className={`htht-search-box ${className}`}>
      <Form>
        <TimeChoice form={form} />
        {!checked ? (
          <Fragment>
            <LinkageSelect form={form} dataSource={dataSource} />
            <Button type='primary' htmlType='submit' onClick={onSubmit}>
              提交
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <SpaceChoice form={form} />
            {radioData.length ? (
              <div className='htht-radio-choice htht-radio-choice-horizontal'>
                <div className='item'>
                  <span className='title'>单选要素：</span>
                  <FormItem>
                    {getFieldDecorator('radioGroup')(
                      <Radio.Group>
                        {radioData.map(item => (
                          <Radio key={item.value} value={item.value}>
                            {item.name}
                          </Radio>
                        ))}
                      </Radio.Group>
                    )}
                  </FormItem>
                </div>
              </div>
            ) : null}
            {checkboxData.length ? (
              <div className='htht-check-choice htht-check-choice-horizontal'>
                <div className='item'>
                  <span className='title'>多选要素：</span>
                  <FormItem>
                    {getFieldDecorator('checkedGroup')(
                      <Checkbox.Group>
                        {checkboxData.map(item => (
                          <Checkbox key={item.value} value={item.value}>
                            {item.name}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    )}
                  </FormItem>
                </div>
              </div>
            ) : null}
            {selectData.length ? (
              <div className='htht-select-choice'>
                <div className='item'>
                  <span className='title'>下拉选择：</span>
                  <FormItem>
                    {getFieldDecorator('selectGroup')(
                      <Select placeholder='请选择下拉' style={{ width: '100%' }}>
                        {selectData.map(item => (
                          <Option key={item.value} value={item.value}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </div>
              </div>
            ) : null}

            <Button type='primary' block onClick={onSubmit}>
              提交
            </Button>
          </Fragment>
        )}
      </Form>
    </div>
  )
}

export default SearchBox
