import React from 'react'
import NjHTHTMAP from "../../../webMap/NjHTHTMAP"

class InitMap extends React.Component {
  componentDidMount() {
    const {dataSource} = this.props
    new NjHTHTMAP(dataSource)
  }


  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div className="htht-initMap" style={style}>
        <div id="mapContainer"/>
      </div>
    )
  }
}

export default InitMap
