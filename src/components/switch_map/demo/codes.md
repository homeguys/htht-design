```jsx
import React from 'react'
import {Button,Select} from 'antd'
import {eventEnum} from "../../../../webMap/enum/event_enum";
import {mapTypeEnum} from "../../../../webMap/enum/map_type_enum";
import NjHTMap from "../../../webMap/NjHTMap"

const { Option } = Select
const ButtonGroup = Button.Group

class InitMap extends React.Component {
  constructor (props) {
    super(props)
  this.state = {
      cutLayer: mapTypeEnum[0].key
    }
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

  switchMap = (value) => {
    if (this.state.cutLayer === value) {
      return
    }
    this.setState({
      cutLayer: value
    })

    this.myMap.switchBaseMap(value)
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
                <Select value={this.state.cutLayer} style={{ width: 120 }} onChange={this.switchMap}>
                     {mapTypeEnum.map(value => {
                       return <Option key={value.key} value={value.key}>{value.name}</Option>
                     })}
                   </Select>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}
   
   export default InitMap
```
