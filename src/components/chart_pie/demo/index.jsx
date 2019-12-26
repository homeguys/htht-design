import React from 'react'
import echarts from 'echarts'


class ChartPie extends React.Component {
  componentDidMount() {
    const {dataSource} = this.props
    const myChart = echarts.init(document.getElementById('chart-pie'));
// 绘制图表
    myChart.setOption(dataSource)
  }

  render() {
    const style = {
      width: '100%',
      height: '300%'
    }
    return (
      <div className="htht-chart-pie">
        <div id="chart-pie" style={style}/>
      </div>
    )
  }
}

export default ChartPie
