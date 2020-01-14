import React from 'react'
import recompact from 'recompact'
import { Searchbox, LinkageSelect } from 'htht-design'
import { Form } from 'antd'
import 'htht-design/lib/linkage_select/style/index.css'
import 'htht-design/lib/search_box/style/index.css'

const enhance = recompact.compose(Form.create({ name: 'home' }))

@enhance
class Home extends React.Component {
  componentDidMount() {}

  render() {
    const { form } = this.props
    return (
      <div id="home">
        <div style={{ width: '4rem' }}>
          <Searchbox form={form} linkageData={123} mode="vertical" />
        </div>
        <LinkageSelect form={form} />
      </div>
    )
  }
}

export default Home
