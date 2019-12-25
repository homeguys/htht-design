import React from 'react'
import {Button} from 'antd'
import axios from 'axios'
import NjHTMap from "../../../webMap/NjHTMap"
import {windTypeEnum} from "../../../webMap/enum/wind_type_enum";

const ButtonGroup = Button.Group

class Wind extends React.Component {
  constructor() {
    super();
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
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
      <div className="htht-wind">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.wind}>风场</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default Wind
