import React from 'react'
import {Button} from 'antd'
import NjHTMap from "../../../webMap/NjHTMap"
import {ELECONFIG, returnEleStyle} from "../../../webMap/config/productConfig";
import {productEnum} from "../../../webMap/enum/product_enum";

const ButtonGroup = Button.Group

class GeoserveService extends React.Component {
  constructor() {
    super();
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap =  new NjHTMap(dataSource)

  }

  loadServer = () => {
    const style = returnEleStyle(productEnum.NDVI)
    const searchInfo = '2019-09-21T12:00:00.003Z'// NDVI

    this.myMap.loadServer('NDVI', ELECONFIG.NDVI.url, ELECONFIG.NDVI.layerName, searchInfo, style)
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
            <Button onClick={this.loadServer}>加载填充图服务</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer"  style={style}/>
      </div>
    )
  }
}

export default GeoserveService
