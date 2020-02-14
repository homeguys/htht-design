import React from 'react'
import VideoPlay from '../index'
import videoPoster from '../../../../static/images/video_poster.png'
import videoSrc from '../../../../static/videos/interview_with_zhu.mp4'

function VideoPlayDemo () {
  return <VideoPlay videoPoster={videoPoster} videoSrc={videoSrc} />
}

export default VideoPlayDemo
