```jsx
import React from 'react'
import {Button} from 'antd'
import {eventEnum} from "../../../../webMap/enum/event_enum";
import {mapTypeEnum} from "../../../../webMap/enum/map_type_enum";
import NjHTMap from "../../../webMap/NjHTMap"
import {ELECONFIG, returnEleStyle} from "../../../webMap/config/productConfig";
import {productEnum} from "../../../webMap/enum/product_enum";

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

    loadServer = () => {
      let style = returnEleStyle(productEnum.NDVI)
      let searchInfo = '2019-09-21T12:00:00.003Z'//NDVI
  
      this.myMap.loadServer('NDVI', ELECONFIG.NDVI.url, ELECONFIG.NDVI.layerName, searchInfo, style)
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
                     <Button onClick={this.loadServer}>加载填充图服务</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}
   
   export default InitMap
```
