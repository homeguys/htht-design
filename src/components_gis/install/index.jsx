import React from 'react'

class Install extends React.Component {
  componentDidMount () {
  }

  render () {
    return (
      <div className="gis-install">
        <p>以下基于react环境下</p>
        <ol>
          <li>npm run eject</li>
          <li>yarn add cesium</li>
          <li>复制node_modules\cesium\Build\Cesium到public 重命名为cesium 删除文件夹里面的Cesium.js文件</li>
          <li>webpack.config.js中在 output:增加
            sourcePrefix: &apos;&apos;</li>
          <li>webpack.config.js中在 module:增加<br/>
            unknownContextCritical: false,<br/>
            unknownContextRegExp: /^.\/.*$/,
          </li>
          <li>在index.js中增加<br/>
            import &apos;cesium/Source/Widgets/widgets.css&apos;<br/>
            import buildModuleUrl from &apos;cesium/Source/Core/buildModuleUrl&apos;<br/>
            buildModuleUrl.setBaseUrl(&apos;./cesium/&apos;)
          </li>

        </ol>
      </div>
    )
  }
}

export default Install
