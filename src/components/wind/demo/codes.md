```jsx
import React from 'react'
import {eventEnum} from "../../../../webMap/enum/event_enum";
import {mapTypeEnum} from "../../../../webMap/enum/map_type_enum";
import NjHTMap from "../../../webMap/NjHTMap"
import {windTypeEnum} from "../../../webMap/enum/wind_type_enum";

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

wind = () => {
    axios.get('./data/wind.json').then(res => {
      this.myMap.wind('wind', windTypeEnum.FEATHER, res.data)
    })

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
            <Button onClick={this.wind}>风场</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}
   
   export default InitMap
```
