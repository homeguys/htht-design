```jsx
import React from 'react'
import {Button} from 'antd'
import {eventEnum} from "../../../../webMap/enum/event_enum";
import {mapTypeEnum} from "../../../../webMap/enum/map_type_enum";
import NjHTMap from "../../../webMap/NjHTMap"
import BaseStaInfo from "../../../webMap/entity/BaseStaInfo";
import {markTypeEnum} from "../../../webMap/enum/mark_type_enum";

const ButtonGroup = Button.Group

class InitMap extends React.Component {
  constructor (props) {
    super(props)
    this.myMap = ''

    this.citeMap = new Map()//城市的map
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

addMark = () => {
    let data = []
    for (let i = 0; i < 180; i += 10) {

      for (let j = 0; j < 90; j += 10) {
        let info = {
          cityName: i + ',' + j,
          cityid: i + ',' + j,
          lat: j,
          lon: i,

        }
        let staInfo = new BaseStaInfo({
          id: info.cityid,
          name: info.cityName,
          picUrl: require('../images/weatherIcons/c00.gif'),
          lon: info.lon,
          lat: info.lat
        })
        data.push(staInfo)
        this.citeMap.set(info.cityid, staInfo)
      }

    }
    this.myMap.addMark('city', data, markTypeEnum.PICANDTEXT)
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
             <Button onClick={this.addMark}>加载站点</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}
   
   export default InitMap
```
