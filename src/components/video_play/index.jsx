import React from 'react'
import axios from 'axios'
import MainContent from '../../site/template/demo_content'
import desc from './desc.json'
import demoCodes from './demo/codes.md'
import demos from './demo/demos'
import { handleArrs } from '../../utils/utils'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codes: ''
    }
  }

  componentDidMount() {
    axios.get(demoCodes).then(res => {
      const { data } = res
      let codes = data.split('---').filter(Boolean)
      codes = codes.map(code => {
        return code
          .replace(/```jsx/, '')
          .replace(/```/, '')
          .trim()
      })
      this.setState({ codes })
    })
  }

  render() {
    const { codes } = this.state
    const mainDesc = desc.main
    const demoDesc = desc.demo
    const { tableData } = desc
    const data = handleArrs(demos, codes, demoDesc)
    return <MainContent data={data} mainDesc={mainDesc} tableData={tableData} />
  }
}
