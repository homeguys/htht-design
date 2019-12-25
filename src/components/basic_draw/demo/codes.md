```jsx
import React from 'react'
import {Button} from 'antd'
import {eventEnum} from "../../../../webMap/enum/event_enum";
import {mapTypeEnum} from "../../../../webMap/enum/map_type_enum";
import NjHTMap from "../../../webMap/NjHTMap"

const ButtonGroup = Button.Group

class InitMap extends React.Component {
  constructor (props) {
    super(props)
    this.myMap = ''
  }

componentDidMount () {
    this.myMap = new NjHTMap({
      domId: 'mapContainer',
      initPostion: [118, 20, 10000000],
      is3D: false,
      isFly: false,
      mapType: mapTypeEnum[0].key,
      callback: myMap => {
        myMap.addEvent('com', eventEnum.LEFT_CLICK, res => {
          console.log(res)
        })
      }
    })
  }

  drawPoint = () => {
     let pointData = [[118, 32], [119, 32]]
     this.myMap.drawPoint(pointData)
   }
 
   drawLine = () => {
     let data = [[118, 32], [119, 32], [119, 33]]
     this.myMap.drawLine(data, [0, 0, 255, 1], 10, false)
   }
 
   drawPolygon = () => {
     let data = [[118, 32, 0], [119, 32, 0], [119, 33, 0], [118, 32, 0]]
     this.myMap.drawPolygon(data)
   }

render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div>
          <div className='bans'>
          <ButtonGroup>
              <Button onClick={this.drawPoint}>画点</Button>
              <Button onClick={this.drawLine}>画线</Button>
              <Button onClick={this.drawPolygon}>画面</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}
   
   export default InitMap
```
