import React from 'react'
import axios from 'axios'
import demoCodes from './codes.md'
import StaticContent from '../../site/template/static_gis'
import desc from './desc'

class WindTypeEnum extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      codes: ''
    }
  }

  componentDidMount () {
    axios.get(demoCodes).then(res => {
      const { data } = res
      let codes = data.split('---').filter(Boolean)
      codes = codes.map(code => {
        return code
          .replace(/```jsx/, '')
          .replace(/```/, '')
          .trim()
      })
      this.setState({
        codes
      })
    })
  }

  render () {
    const { codes } = this.state
    return <StaticContent codes={codes} desc={desc}/>
  }
}

export default WindTypeEnum
