/* eslint-disable prefer-template */
import React from 'react'
import echarts from 'echarts'
import { deepObjectMerge, createHash } from '../../../utils/utils'

class ChartBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.hash = createHash(6)
    this.option = {
      backgroundColor: '#2c343c',
      tooltip: {
        trigger: 'item'
        // formatter: params => {
        //   return '要素名称 : ' + params.name + '<br />' + '到报率 : ' + params.value + '%'
        // }
      },
      grid: {
        left: '7%',
        bottom: '0%',
        top: '8%',
        right: '5%',
        containLabel: true
      },
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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

  componentDidUpdate() {
    const { dataSource, option } = this.props
    const myChart = echarts.init(document.getElementById(`htht-chart-bar-${this.hash}`))
    const newOption = deepObjectMerge(this.option, option)

    newOption.series[0].data = dataSource

    console.warn(newOption)
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
    return <div className="htht-chart-bar" id={`htht-chart-bar-${this.hash}`} />
  }
}

export default ChartBar
