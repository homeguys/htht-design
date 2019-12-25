import React from 'react'
import {Button} from 'antd'
import NjHTMap from "../../../webMap/NjHTMap"

const ButtonGroup = Button.Group

class BasicDraw extends React.Component {
  constructor() {
    super();
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
  }


  drawPoint = () => {
    const pointData = [[118, 32], [119, 32]]
    this.myMap.drawPoint(pointData)
  }

  drawLine = () => {
    const data = [[118, 32], [119, 32], [119, 33]]
    this.myMap.drawLine(data, [0, 0, 255, 1], 10, false)
  }

  drawPolygon = () => {
    const data = [[118, 32, 0], [119, 32, 0], [119, 33, 0], [118, 32, 0]]
    this.myMap.drawPolygon(data)
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div className="htht-basic-draw">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.drawPoint}>画点</Button>
            <Button onClick={this.drawLine}>画线</Button>
            <Button onClick={this.drawPolygon}>画面</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default BasicDraw
