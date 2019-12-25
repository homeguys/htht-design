import React from 'react'
import {Button} from 'antd'
import NjHTMap from "../../../webMap/NjHTMap"

const ButtonGroup = Button.Group

class TextAndPic extends React.Component {
  constructor() {
    super();
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
  }

  text = () => {
    for (let i = 0; i < 100; i++) {
      this.myMap.text(`data${i}`, 0.5, [118, 32 + 0.1 * i], [255, 0, 0, 1])
    }

  }

  addPic = () => {
    this.myMap.addPic('myPic', './data/320000000000.png', [118, 32, 133, 45])
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div className="htht-text-pic">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.text}>文字</Button>
            <Button onClick={this.addPic}>贴图</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default TextAndPic
