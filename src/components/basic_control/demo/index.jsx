import React from 'react'
import {Button} from 'antd'
import NjHTMap from "../../../webMap/NjHTMap"

const ButtonGroup = Button.Group

class BasicControl extends React.Component {
  constructor() {
    super();
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
  }

  in = () => {
    this.myMap.in()
  }

  out = () => {
    this.myMap.out()
  }

  init = () => {
    this.myMap.init()
  }

  setView = () => {
    this.myMap.setView([118, 33], true)
  }


  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div className="htht-basic-control">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.in}> 放大</Button>
            <Button onClick={this.out}> 缩小</Button>
            <Button onClick={this.init}> 恢复</Button>
            <Button onClick={this.setView}> 定位</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default BasicControl
