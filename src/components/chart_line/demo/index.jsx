import React from 'react'
import echarts from 'echarts'
import { deepObjectMerge, createHash } from '../../../utils/utils'

class ChartLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.hash = createHash(6)
    this.option = {
      backgroundColor: '#2c343c',
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          areaStyle: {
            color: '#00cccd'
          },
          lineStyle: {
            color: '#00cccd'
          }
        }
      ]
    }
  }

  componentDidUpdate() {
    const { dataSource, option } = this.props
    const myChart = echarts.init(document.getElementById(`htht-chart-line-${this.hash}`))
    const newOption = deepObjectMerge(this.option, option)

    newOption.xAxis.data = dataSource.xAxisData
    newOption.series[0].data = dataSource.seriesData

    // 绘制图表
    myChart.setOption(newOption)
    this.screenChange()
  }

  /** echants响应屏幕改变 */
  screenChange() {
    window.addEventListener('resize', () => {
      this.chartPie.resize()
    })
  }

  render() {
    return <div className="htht-chart-line" id={`htht-chart-line-${this.hash}`} />
  }
}

export default ChartLine
