import React from 'react'
import echarts from 'echarts'


class ChartGauge extends React.Component {
  componentDidMount() {
    const {dataSource} = this.props
    const myChart = echarts.init(document.getElementById('chart-gauge'));
// 绘制图表
    myChart.setOption(dataSource)

    // eslint-disable-next-line func-names
    setInterval(function () {
      dataSource.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      myChart.setOption(dataSource, true);
    },2000)
  }

  render() {
    const style = {
      width: '100%',
      height: '300%'
    }
    return (
      <div className="htht-chart-gauge">
        <div id="chart-gauge" style={style}/>
      </div>
    )
  }
}

export default ChartGauge
