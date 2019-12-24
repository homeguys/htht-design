import React from 'react'
import {Timeline} from 'antd';
import DocContent from '../../site/template/doc_content'
import desc from './desc'


class Changelog extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      contentArray: []
    }

    this.itemMap = new Map()
    this.timeArray = []
  }


  componentDidMount() {
    for (let i = 0; i < desc.change_log.length; i++) {
      const item = desc.change_log[i]
      this.itemMap.set(item.version, {
        "time": item.time,
        "version": item.version,
        "content": item.content
      });
      this.timeArray.push({
        key: item.version,
        value: `${item.version} ${item.time}`
      })
    }

    this.setState({
      title: this.timeArray[0].key,
      contentArray: this.itemMap.get(this.timeArray[0].key).content
    })


  }


  clickVersion = (e) => {
    const item = this.itemMap.get(e.target.parentNode.getAttribute("data-value"));
    if (item) {
      this.setState({
        title: item.version,
        contentArray: item.content
      })
    }
  }

  render() {
    const {title, contentArray} = this.state;
    return (
      <DocContent>
        <div className="gis-change-log">
          <div className="gis-change-time">
            <Timeline>
              {this.timeArray.map(value => {
                return <Timeline.Item onClick={this.clickVersion} data-value={value.key}
                                      key={value.key}>{value.value}</Timeline.Item>
              })}
            </Timeline>
          </div>
          <div className="gis-change-content">
            <h1>{title}</h1>
            <ol>
              {contentArray.map((value, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <li key={index}>{value}</li>
              })}
            </ol>
          </div>
        </div>
      </DocContent>
    )
  }
}

export default Changelog
