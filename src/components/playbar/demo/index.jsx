import React from 'react'
import { Slider, message } from 'antd'
import { toast } from '../../../utils/utils'

class Playbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlay: false,
      value: 0,
      marks: props.marks,
      autoplaySpeed: props.autoplaySpeed
    }
    this.timer = null
    this.onChange = props.onChange
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    const { marks, autoplaySpeed = 1000 } = props
    if (marks !== state.marks || autoplaySpeed !== state.autoplaySpeed) {
      return {
        marks,
        autoplaySpeed
      }
    }
    return null
  }

  componentWillUnmount() {
    this.resetAutoPlay()
  }

  autoPlay = () => {
    this.setState(
      previous => {
        return {
          isPlay: !previous.isPlay
        }
      },
      () => {
        const { isPlay, value } = this.state
        if (isPlay) {
          this.setAutoPlayInterval()
        } else {
          this.resetAutoPlay(value)
        }
      }
    )
  }

  // 设置播放定时器
  setAutoPlayInterval = () => {
    clearInterval(this.timer)
    let { value } = this.state
    const { marks, autoplaySpeed } = this.state
    const max = Object.keys(marks).length - 1

    this.timer = setInterval(() => {
      if (value >= max) {
        value = 0
        this.resetAutoPlay(value)
      } else {
        /**
         * 相对应的操作
         */
        value++
        this.setState({
          value
        })
        this.onChange && this.onChange(value)
      }
    }, autoplaySpeed)
  }

  // 重置播放定时器
  resetAutoPlay = value => {
    clearInterval(this.timer)
    this.setState({
      isPlay: false,
      value
    })
  }

  // 上一个
  previousPlay = () => {
    let { value } = this.state
    if (value > 0) {
      value -= 1
      this.setState({
        value
      })
      this.onChange && this.onChange(value)
    } else {
      toast(message, '已经是第一个', 'info')
    }
  }

  // 下一个
  nextPlay = () => {
    let { value } = this.state
    const { marks } = this.state
    const max = Object.keys(marks).length - 1

    if (value < max) {
      value += 1
      this.setState({
        value
      })
      this.onChange && this.onChange(value)
    } else {
      toast(message, '已经是最后一个', 'info')
    }
  }

  // 第一个
  firstPlay = () => {
    const { value } = this.state
    if (value !== 0) {
      this.onChange && this.onChange(0)
      this.setState({
        value: 0
      })
    }
  }

  // 拖动slider
  dragSlider = value => {
    this.setState({
      value
    })
    this.onChange && this.onChange(value)
  }

  render() {
    const { isPlay, value, marks } = this.state
    const max = marks ? Object.keys(marks).length - 1 : 0
    console.warn(this.state)
    return (
      <div className="htht-playbar">
        <div className="play-btn">
          <span className="play-switch" onClick={this.autoPlay}>
            {isPlay ? (
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path
                  d="M686.480358 119.560026c0-32.377408 26.325575-58.644655 58.644655-58.644655 32.386618 0 58.645678 26.420743 58.645678 58.644655l0 781.930779c0 32.376385-26.325575 58.644655-58.645678 58.644655-32.385595 0-58.644655-26.419719-58.644655-58.644655L686.480358 119.560026zM217.321072 119.560026c0-32.377408 26.325575-58.644655 58.645678-58.644655 32.385595 0 58.644655 26.420743 58.644655 58.644655l0 781.930779c0 32.376385-26.325575 58.644655-58.644655 58.644655-32.385595 0-58.645678-26.419719-58.645678-58.644655L217.321072 119.560026z"
                  p-id="4269"
                  fill="#00afff"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path
                  fill="#00afff"
                  d="M811.46758467 406.92421513C903.11135557 464.95534326 903.06176768 559.07379424 811.46758467 617.07352344L309.75390635 934.77118115C218.11013633 992.80231192 143.81818174 955.01631113 143.81818174 850.49963633L143.81818174 173.49810224C143.81818174 68.9250834 218.15972422 31.22682646 309.75390635 89.22655479L811.46758467 406.92421513 811.46758467 406.92421513Z"
                />
              </svg>
            )}
            <i className="top-left" />
            <i className="top-right" />
            <i className="bottom-left" />
            <i className="bottom-right" />
          </span>
          <span className="first-play" onClick={this.firstPlay}>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                fill="#00afff"
                d="M716.8 290.133333c-110.933333-102.4-281.6-106.666667-396.8-12.8S170.666667 537.6 247.466667 665.6c59.733333 106.666667 179.2 166.4 302.933333 149.333333s221.866667-102.4 256-221.866666c8.533333-34.133333 42.666667-51.2 76.8-42.666667 34.133333 8.533333 51.2 42.666667 42.666667 76.8-68.266667 226.133333-302.933333 354.133333-524.8 290.133333C174.933333 853.333333 42.666667 618.666667 106.666667 392.533333c42.666667-145.066667 153.6-256 298.666666-298.666666s298.666667 0 405.333334 102.4l81.066666-81.066667c8.533333-8.533333 21.333333-12.8 34.133334-8.533333 4.266667 12.8 12.8 21.333333 12.8 34.133333v264.533333c0 17.066667-12.8 29.866667-29.866667 29.866667h-260.266667c-12.8 0-25.6-8.533333-29.866666-17.066667s0-25.6 8.533333-34.133333l89.6-93.866667z"
              />
            </svg>
          </span>
          <span className="previous-play" onClick={this.previousPlay}>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                fill="#fff"
                d="M212.53241532 617.07578487C120.88864443 559.04465674 120.93823232 464.92620576 212.53241533 406.92647656L714.24609365 89.22881885C805.88986367 31.19768808 880.18181826 68.98368886 880.18181826 173.50036367L880.18181826 850.50189776C880.18181826 955.0749166 805.84027578 992.77317354 714.24609365 934.77344521L212.53241532 617.07578487 212.53241532 617.07578487Z"
              />
            </svg>
          </span>
          <span className="next-play" onClick={this.nextPlay}>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path
                fill="#fff"
                d="M811.46758467 406.92421513C903.11135557 464.95534326 903.06176768 559.07379424 811.46758467 617.07352344L309.75390635 934.77118115C218.11013633 992.80231192 143.81818174 955.01631113 143.81818174 850.49963633L143.81818174 173.49810224C143.81818174 68.9250834 218.15972422 31.22682646 309.75390635 89.22655479L811.46758467 406.92421513 811.46758467 406.92421513Z"
              />
            </svg>
          </span>
        </div>
        <div className="slider-contanier">
          <Slider min={0} max={max} marks={marks} value={value} onChange={this.dragSlider} />
        </div>
        <div className="download">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path
              fill="#fff"
              d="M384 448V128h256v320h192l-320 320-320-320h192z m-192 384h640v64H192v-64z"
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Playbar
