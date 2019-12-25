import React from 'react'
import {Button} from 'antd'
import NjHTMap from "../../../webMap/NjHTMap"
import BaseStaInfo from "../../../webMap/entity/BaseStaInfo";
import {markTypeEnum} from "../../../webMap/enum/mark_type_enum";

const ButtonGroup = Button.Group

class Mark extends React.Component {
  constructor() {
    super();
    this.myMap = ""
    this.citeMap = new Map()// 城市的map

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
  }

  addMark = () => {
    const data = []
    for (let i = 0; i < 180; i += 10) {

      for (let j = 0; j < 90; j += 10) {
        const info = {
          cityName: `${i},${j}`,
          cityid: `${i},${j}`,
          lat: j,
          lon: i,

        }
        const staInfo = new BaseStaInfo({
          id: info.cityid,
          name: info.cityName,
          // eslint-disable-next-line global-require,import/no-unresolved
          picUrl: require('../../../images/weatherIcons/c00.gif'),
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
      <div className="htht-initMap">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.addMark}>加载站点</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default Mark
