import React from 'react'
import axios from 'axios'
import demoCodes from './codes.md'
import Highlight from '../../site/template/highlight'

class MyCesium extends React.Component {
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
    return (
      <div>
        <h1>MyCesium</h1>
        <Highlight className="javascript,js,jsx">{codes[0]}</Highlight>
        <h2>Constructors</h2>
        <Highlight className="javascript,js,jsx">{codes[1]}</Highlight>
        <h2>Property Overview</h2>
        <table border="1">
          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Summary</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>January</td>
            <td>$100</td>
            <td>$100</td>
          </tr>
          </tbody>

        </table>
        <h2>Property Details</h2>
        <h2>Method Overview</h2>
        <table border="1">
          <thead>
          <tr>
            <th>Name</th>
            <th>Return Type</th>
            <th>Summary</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>January</td>
            <td>$100</td>
            <td>$100</td>
          </tr>
          </tbody>

        </table>
        <h2>Method Details</h2>
      </div>
    )
  }
}

export default MyCesium
