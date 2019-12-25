import React from 'react'
import {Button, Select} from 'antd'
import NjHTMap from "../../../webMap/NjHTMap"
import {mapTypeEnum} from "../../../webMap/enum/map_type_enum";

const {Option} = Select
const ButtonGroup = Button.Group

class SwitchMap extends React.Component {
  constructor() {
    super();
    this.state = {
      cutLayer: mapTypeEnum[0].key
    }
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
  }

  switchMap = (value) => {
    const {cutLayer} = this.state
    if (cutLayer === value) {
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
    const {cutLayer} = this.state
    return (
      <div className="htht-switch-map">
        <div className='bans'>
          <ButtonGroup>
            <Select value={cutLayer} style={{width: 120}} onChange={this.switchMap}>
              {mapTypeEnum.map(value => {
                return <Option key={value.key} value={value.key}>{value.name}</Option>
              })}
            </Select>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default SwitchMap
