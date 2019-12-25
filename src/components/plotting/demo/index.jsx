import React from 'react'
import {Button} from 'antd'
import NjHTMap from "../../../webMap/NjHTMap"
import BasePlottingInfo from "../../../webMap/entity/BasePlottingInfo";
import {plottingTypeEnum} from "../../../webMap/enum/plotting_type_enum";

const ButtonGroup = Button.Group

class Plotting extends React.Component {
  constructor() {
    super();
    this.myMap = ""
    this.statMap = new Map()// 填图数据的map
  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
  }

  drawPlotting = () => {
    const data = []
    for (let i = 0; i < 100; i++) {
      const info = {
        'dataInfo': {
          AT: 208,
          CH: 99999,
          CL: 0,
          CM: 99999,
          DP24: 99999,
          DT24: 99999,
          H: 700,
          INVALID_VALUE: 99999,
          N: 20,
          NH: 20,
          OP: 99999,
          P3: 99999,
          R6: 99999,
          TD: -23,
          VV: 80,
          WD: 225,
          WG1: 99999,
          WG2: 99999,
          WS: 40,
          WW: 0,
        },
        'id': i,
        'name': i,
        'position': {
          'altitude': 0,
          'latitude': Math.random() * 90,
          'longitude': Math.random() * 180
        }
      }

      const plottingInfo = new BasePlottingInfo({
        id: info.id,
        name: info.name,
        position: [info.position.longitude, info.position.latitude],
        dataInfo: info.dataInfo
      })

      data.push(plottingInfo)
      this.statMap.set(info.id, plottingInfo)
    }
    this.myMap.drawPlotting('plottingData', data, plottingTypeEnum.GROUND, 10)
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div className="htht-initMap">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.drawPlotting}>绘制填图</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default Plotting
