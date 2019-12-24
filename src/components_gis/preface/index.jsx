import React from 'react'
import DocContent from '../../site/template/doc_content'

class Preface extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <DocContent>
        <div className="gis-preface">
          <p>NjHTMap api文档</p>
          <p>有事请联系：李思源</p>
          <p>电话：15251779852</p>
          <p>邮箱：lisiyuan@piesat.cn</p>
        </div>
      </DocContent>
    )
  }
}

export default Preface
