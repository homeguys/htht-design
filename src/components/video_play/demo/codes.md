```jsx
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import videoPoster from '../../../../static/images/video_poster.png'
import videoSrc from '../../../../static/videos/interview_with_zhu.mp4'

class VideoPlay extends React.Component {
  constructor(props) {
    super(props)
    this.controls = null
    this.video = null
    this.border = null
  }

  componentDidMount() {
    this.controls = document.querySelector('.htht-videoplay .controls')
    this.video = document.querySelector('.htht-videoplay video')
    this.border = document.querySelector('.htht-videoplay .border')

    // 播放暂停按钮点击
    this.controls.addEventListener('click', this.autoPlayVideo, false)
  }

  componentWillUnmount() {
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
    this.border.style.display = 'block'
  }

  hideControls = () => {
    this.controls.style.display = 'none'
    this.border.style.display = 'none'
  }

  render() {
    return (
      <div
        className="htht-videoplay"
        onMouseEnter={this.showControls}
        onMouseLeave={this.hideControls}
        style={{ width: '8rem' }}
      >
        <video src={videoSrc} poster={videoPoster} />
        <i className="controls" />
        <i className="border" />
      </div>
    )
  }
}

export default VideoPlay
```
