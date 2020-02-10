/* eslint-disable react/no-danger */
import React from 'react'
import axios from 'axios'
import marked from 'marked'
import README from './README.md'
import DocContent from '../../site/template/doc_content'
import './style.scss'

class Preface extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: null
    }
  }

  componentDidMount () {
    axios.get(README).then(res => {
      const content = marked(res.data)
      console.warn(content)
      this.setState({
        content
      })
    })
  }

  render () {
    const { content } = this.state

    return (
      <DocContent>
        <div className='preface' dangerouslySetInnerHTML={{ __html: content }} />
        {/* <div>preface</div> */}
      </DocContent>
    )
  }
}

export default Preface
