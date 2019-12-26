import React from 'react'
import echarts from 'echarts'


class ChartBar extends React.Component {
  componentDidMount() {
    const {dataSource} = this.props
    const myChart = echarts.init(document.getElementById('chart-bar'));
// 绘制图表
    myChart.setOption(dataSource)
  }

  render() {
    const style = {
      width: '100%',
      height: '300%'
    }
    return (
      <div className="htht-chart-bar">
        <div id="chart-bar" style={style}/>
      </div>
    )
  }
}

export default ChartBar
