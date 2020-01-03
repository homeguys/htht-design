/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import { deepObjectMerge, createHash } from '../../../utils/utils'

class ChartGauge extends React.Component {
  constructor(props) {
    super(props)
    this.hash = createHash(8)
  }

  componentDidUpdate() {
    const { option, color, value } = this.props
    const myChart = echarts.init(document.getElementById(`htht-chart-gauge-${this.hash}`))

    const innerOption = {
      backgroundColor: '#2c343c',
      grid: {
        left: '0%',
        bottom: '0%',
        right: '0%',
        top: '0%',
        containLabel: true
      },
      color: ['rgba(176, 212, 251, 1)'],
      series: [
        {
          name: '运行状态',
          type: 'pie',
          clockWise: true,
          radius: ['57%', '67%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [
            {
              value,
              label: {
                normal: {
                  rich: {
                    a: {
                      color: '#fff',
                      align: 'center',
                      fontSize: 35,
                      fontWeight: 'bold',
                      fontFamily: '方正粗倩_GBK'
                    },
                    b: {
                      color,
                      align: 'center',
                      fontSize: 16
                    },
                    c: {
                      fontSize: 15,
                      fontFamily: '方正粗倩_GBK',
                      fontWeight: 'bold',
                      color: '#fff'
                    }
                  },
                  formatter: () => {
                    return '{a|' + 30 + '}' + ' {c|%}' + `\n\n{b|${'正常'}}`
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal',
                    color: '#fff'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color,
                  shadowColor: '#82ffff',
                  borderWidth: 2,
                  shadowBlur: 5
                }
              }
            },
            {
              name: '未使用',
              value: 100 - value,
              itemStyle: {
                normal: {
                  color: '#154e48',
                  borderWidth: 1
                  //   borderColor: '#073A66'
                }
              }
            }
          ]
        }
      ]
    }

    const newOption = deepObjectMerge(innerOption, option)

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
    return <div className="htht-chart-gauge" id={`htht-chart-gauge-${this.hash}`} />
  }
}

export default ChartGauge
