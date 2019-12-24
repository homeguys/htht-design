/* eslint-disable */
import Cesium from 'cesium/Source/Cesium'

export default class Canvas {
  constructor ({Cartesian3ToPx, viewer}) {
    this.Cartesian3ToPx = Cartesian3ToPx
    this.viewer = viewer
    this.ctx = ''
    this.canvasNormal = ''
    this.boundInfo = {
      Width: 0,
      Height: 0
    }
    this.dataInfo = {}
  }

  loadData () {
  }

  draw () {}

  lonLatToCanvasXY (lon, lat) {
    let px = {
      x: (lon - this.dataInfo.LonMin) * this.boundInfo.Width / (this.dataInfo.LonMax - this.dataInfo.LonMin),
      y: (this.dataInfo.LatMax - lat) * this.boundInfo.Height / (this.dataInfo.LatMax - this.dataInfo.LatMin),
    }

    return [px.x, px.y]
  }


  lonLatToXY (lon, lat) {
    let px = this.Cartesian3ToPx(this.viewer.scene, Cesium.Cartesian3.fromDegrees(lon, lat, 0))
    return [px.x, px.y]
  }
}
