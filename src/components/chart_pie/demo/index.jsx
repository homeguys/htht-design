import React from 'react'
import echarts from 'echarts'
import { deepObjectMerge, createHash } from '../../../utils/utils'

class ChartPie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.hash = createHash(6)
    this.option = {
      backgroundColor: '#2c343c',

      title: {
        text: 'This is a Pie!',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      color: '#c23531',
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '55%'],
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay() {
            return Math.random() * 200
          }
        }
      ]
    }
  }

  componentDidUpdate() {
    const { dataSource, option } = this.props
    const myChart = echarts.init(document.getElementById(`htht-chart-pie-${this.hash}`))
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
    return <div className="htht-chart-pie" id={`htht-chart-pie-${this.hash}`} />
  }
}

export default ChartPie
