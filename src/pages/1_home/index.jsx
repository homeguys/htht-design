import React from 'react'
import recompact from 'recompact'
import { TimeSwitch } from 'htht-design'
import { Form } from 'antd'

const enhance = recompact.compose(Form.create({ name: 'home' }))

@enhance
class Home extends React.Component {
  componentDidMount() {}

  render() {
    const { form } = this.props
    return (
      <div id="home">
        <div style={{ width: '4rem' }}>
          <TimeSwitch form={form} />
        </div>
      </div>
    )
  }
}

export default Home
