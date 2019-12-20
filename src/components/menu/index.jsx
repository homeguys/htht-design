import React from 'react'
import axios from 'axios'
import MainContent from '../../site/template/demo_content'
import description from './description.json'
import manifest from './demo/manifest.md'
import { handleArrs } from '../../utils/utils'
import Demos from './demo'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      demoCode: ''
    }
  }

  componentDidMount() {
    axios.get(manifest).then(res => {
      const { data } = res
      this.setState({ demoCode: data.split('```') })
    })
  }

  render() {
    const { demoCode } = this.state
    const mainDesc = description.main
    const demoDesc = description.demo
    const data = handleArrs(Demos, demoCode, demoDesc)
    return <MainContent data={data} mainDesc={mainDesc} />
  }
}

export default List
