import React from 'react'
import echarts from 'echarts'


class ChartLine extends React.Component {
  componentDidMount() {
    const {dataSource} = this.props
    const myChart = echarts.init(document.getElementById('chart-line'));
// 绘制图表
    myChart.setOption(dataSource)
  }

  render() {
    const style = {
      width: '100%',
      height: '300%'
    }
    return (
      <div className="htht-chart-line">
        <div id="chart-line" style={style}/>
      </div>
    )
  }
}

export default ChartLine
