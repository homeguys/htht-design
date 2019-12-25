import React from 'react'
import DocContent from '../../site/template/doc_content'

class Install extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <DocContent>
        <div className="gis-download">
          <h1>相关资源下载</h1>
          <table>
            <thead>
            <tr>
              <th>资源名</th>
              <th>下载路径</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>webMap</td>
              <td><a href="http://192.168.1.197:8080/server/webMap.rar">http://192.168.1.197:8080/server/webMap.rar</a>
              </td>
            </tr>
            <tr>
              <td>demo中相关json资源文件</td>
              <td><a href="http://192.168.1.197:8080/server/data.rar">http://192.168.1.197:8080/server/data.rar</a></td>
            </tr>
            <tr>
              <td>城镇天气图标</td>
              <td><a href="http://192.168.1.197:8080/server/images.rar">http://192.168.1.197:8080/server/images.rar</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </DocContent>
    )
  }
}

export default Install
