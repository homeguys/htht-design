import React from 'react'

class ScrollList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="htht-list htht-scroll-list">
        <ul>
          <li>文字上下滚动</li>
          <li>文字上下滚动</li>
          <li>文字上下滚动</li>
          <li>文字上下滚动</li>
        </ul>
      </div>
    )
  }
}

export default ScrollList
