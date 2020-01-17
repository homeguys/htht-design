import React from 'react'
import Playbar from '../index'

class PlaybarBasic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      marks: {
        0: '00:00',
        1: '01:00',
        2: '02:00',
        3: '03:00',
        4: '04:00',
        5: '05:00',
        6: '06:00',
        7: '07:00',
        8: '08:00',
        9: '09:00',
        10: '10:00',
        11: '11:00',
        12: '12:00',
        13: '00:00',
        14: '01:00',
        15: '02:00',
        16: '03:00',
        17: '04:00',
        18: '05:00',
        19: '06:00',
        20: '00:00'
      }
    }
    this.count = 0
  }

  changeMarks = () => {
    this.setState({
      marks: {
        0: '00:00',
        1: '01:00',
        2: '02:00',
        3: '03:00',
        4: '04:00',
        5: '05:00',
        6: '06:00'
      }
    })
  }

  onChange = value => {
    console.warn(value)
  }

  render () {
    const { marks } = this.state

    return (
      <div>
        <Playbar marks={marks} onChange={this.onChange} />
        <input type='button' value='按钮' onClick={this.changeMarks} />
      </div>
    )
  }
}

export default PlaybarBasic
