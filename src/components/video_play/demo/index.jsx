import React from 'react'
import WarnBox from '../../common/warn_box'

class VideoPlay extends React.Component {
  constructor (props) {
    super(props)
    this.controls = null
    this.video = null
  }

  componentDidMount () {
    this.controls = document.querySelector('.htht-videoplay .controls')
    this.video = document.querySelector('.htht-videoplay video')

    // 播放暂停按钮点击
    if (this.controls) {
      this.controls.addEventListener('click', this.autoPlayVideo, false)
    }
  }

  componentWillUnmount () {
    this.controls.removeEventListener('click', this.autoPlayVideo)
  }

  autoPlayVideo = e => {
    if (e.target.className.includes('pause')) {
      this.video.pause()
    } else {
      this.video.play()
    }
    e.target.classList.toggle('pause')
  }

  showControls = () => {
    this.controls.style.display = 'block'
  }

  hideControls = () => {
    this.controls.style.display = 'none'
  }

  render () {
    const { videoSrc, videoPoster } = this.props

    // 没传videoSrc的话警告
    if (!videoSrc) {
      return <WarnBox title='请传入videoSrc' />
    }

    return (
      <div
        className='htht-videoplay'
        onMouseEnter={this.showControls}
        onMouseLeave={this.hideControls}
      >
        <video src={videoSrc} poster={videoPoster} />
        <i className='controls' />
      </div>
    )
  }
}

export default VideoPlay
