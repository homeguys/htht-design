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

  text = () => {
    for (let i = 0; i < 100; i++) {
      this.myMap.text('data' + i, 0.5, [118, 32 + 0.1 * i], [255, 0, 0, 1])
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
      <div>
          <div className='bans'>
          <ButtonGroup>
               <Button onClick={this.text}>文字</Button>
               <Button onClick={this.addPic}>贴图</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}
   
   export default InitMap
```
