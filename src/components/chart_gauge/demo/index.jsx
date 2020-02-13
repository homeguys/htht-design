/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import { deepObjectMerge, createHash } from '../../common/utils'

class ChartGauge extends React.Component {
  constructor (props) {
    super(props)
    this.hash = createHash(8)
    this.myChart = null
  }

  componentDidMount () {
    this.renderChart()
  }

  componentDidUpdate () {
    this.renderChart()
  }

  // 获取默认配置
  getDefaultOption (value1, color) {
    const value = isNaN(value1) ? 30 : Number(value1)

    return {
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
              value: value || 30,
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
                      color: color || '#f7872f',
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
                    return '{a|' + (value || 30) + '}' + ' {c|%}' + `\n\n{b|${'正常'}}`
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
                  color: color || '#f7872f',
                  shadowColor: '#82ffff',
                  borderWidth: 2,
                  shadowBlur: 5
                }
              }
            },
            {
              name: '未使用',
              value: 100 - (value || 30),
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
  }

  /** echants响应屏幕改变 */
  screenChange () {
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  }

  // 渲染gauge图表
  renderChart () {
    const { option, color, value } = this.props
    this.myChart = echarts.init(document.getElementById(`htht-chart-gauge-${this.hash}`))
    const newOption = deepObjectMerge(this.getDefaultOption(value, color), option)
    this.myChart.clear()

    // 绘制图表
    this.myChart.setOption(newOption)
    this.screenChange()
  }

  render () {
    return <div className='htht-chart-gauge' id={`htht-chart-gauge-${this.hash}`} />
  }
}

export default ChartGauge
