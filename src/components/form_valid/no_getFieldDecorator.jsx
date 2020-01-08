import React from 'react'

class NoGetFieldDecorator extends React.Component {
  componentDidMount() {}

  render() {
    return <div style={{ color: 'red' }}>请传入getFieldDecorator</div>
  }
}

export default NoGetFieldDecorator
