import React from 'react'
import { Form, DatePicker } from 'antd'
import { hthtPrefix } from '../../../config/varibles'

const FormItem = Form.Item

class TimeChoice extends React.Component {
	componentDidMount() {}

	render() {
		const { style, mode } = this.props
		const dateStyle = style || { width: '1.4rem' }

		return (
			<div className="htht-time-choice">
				<span className="title">时间选择：</span>
				<FormItem>
					{getFieldDecorator('startTime', {
						rules: [{ required: true, message: '请输入开始时间！' }]
					})(
						<DatePicker
							showToday={false}
							format="YYYY-MM-DD"
							allowClear={false}
							onChange={e => this.handleChange(e, 'startTime')}
							style={dateStyle}
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
							onChange={e => this.handleChange(e, 'endTime')}
							style={dateStyle}
						/>
					)}
				</FormItem>
			</div>
		)
	}
}

export default TimeChoice
