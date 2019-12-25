import React from 'react'
import {Button} from 'antd'
import axios from 'axios'
import NjHTMap from "../../../webMap/NjHTMap"

const ButtonGroup = Button.Group

class ContourLine extends React.Component {
  constructor() {
    super();
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap =  new NjHTMap(dataSource)
  }

  contourLine = () => {
    axios.get('./data/line.json').then(res => {
      this.myMap.contourLine('line', res.data)
    })
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div className="htht-contour-line">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.contourLine}>等值线</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}

export default ContourLine
