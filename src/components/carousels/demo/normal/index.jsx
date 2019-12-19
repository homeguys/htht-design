/* eslint-disable react/no-string-refs */
import React from 'react'
import { Carousel } from 'antd'
import carousels1 from '../../../../static/images/pic_carousel_1.png'
import carousels2 from '../../../../static/images/pic_carousel_2.png'

const imgs = [carousels1, carousels2]

class Carousels extends React.Component {
  constructor(props) {
    super(props)
    this.params = {
      autoplay: false
    }
  }

  render() {
    return (
      <div className="htht-carousels" style={{ width: '6rem' }}>
        <div className="exhibition-area">
          <div className="switch left" onClick={e => this.handleNextOrPre('left', e)} />
          <div className="switch right" onClick={e => this.handleNextOrPre('right', e)} />
          <Carousel autoplay ref="Carousel">
            {imgs.map(item => {
              return (
                <div key={item}>
                  <img src={item} alt={item} />
                </div>
              )
            })}
          </Carousel>
        </div>
      </div>
    )
  }
}

export default Carousels
