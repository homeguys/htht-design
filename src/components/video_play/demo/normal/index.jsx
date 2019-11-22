/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import videoPoster from '../../../../static/images/video_poster.png'
import video from '../../../../static/videos/interview_with_zhu.mp4'

class VideoPlay extends React.Component {
  constructor(props) {
    super(props)
    this.date = new Date()
  }

  render() {
    return (
      <div className="htht-videoplay">
        <video src={video} poster={videoPoster} />
        <i className="controls" onMouseEnter={this.showControls} />
        <i className="border" onMouseEnter={this.showControls} onMouseLeave={this.hideControls} />
      </div>
    )
  }
}

export default VideoPlay
