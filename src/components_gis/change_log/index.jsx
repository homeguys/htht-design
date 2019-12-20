import React from 'react'
import DocContent from '../../site/template/doc_content'

class Changelog extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <DocContent>
        <div className="gis-change-log">
          <p>v1</p>
          <p>第一个版本，一堆问题，无话可说</p>
        </div>
      </DocContent>
    )
  }
}

export default Changelog
