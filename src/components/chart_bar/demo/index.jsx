import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { deepObjectMerge, createHash } from '../../common/utils'

class ChartBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.hash = createHash(8)
    this.myChart = null
    this.option = {
      backgroundColor: '#2c343c',
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: '7%',
        bottom: '0%',
        top: '8%',
        right: '5%',
        containLabel: true
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: '#FFF'
          },
          rotate: 30
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#454A5C'
          }
        }
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#454A5C'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#FFF'
          }
        }
      },

      series: [
        {
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          }
        }
        // {
        //   // For shadow
        //   type: 'bar',
        //   itemStyle: {
        //     normal: { color: '#595A62' }
        //   },
        //   barGap: '-100%',
        //   barCategoryGap: '50%',
        //   data: dataShadow
        // }
      ]
    }
  }

  componentDidMount () {
    this.renderCharts()
  }

  componentDidUpdate () {
    this.renderCharts()
  }

  /** echants响应屏幕改变 */
  screenChange () {
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  }

  // 渲染柱状图
  renderCharts () {
    const { dataSource, option } = this.props
    this.myChart = echarts.init(document.getElementById(`htht-chart-bar-${this.hash}`))
    const newOption = deepObjectMerge(this.option, option)

    newOption.xAxis.data = dataSource.xAxisData
    newOption.series[0].data = dataSource.seriesData
    this.myChart.clear()
    // 绘制图表
    this.myChart.setOption(newOption)
    this.screenChange()
  }

  render () {
    return <div className='htht-chart-bar' id={`htht-chart-bar-${this.hash}`} />
  }
}

export default ChartBar
