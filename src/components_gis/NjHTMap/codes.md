```jsx
import NjHTMap from '../webMap/NjHTMap'
```

---

```jsx
new NjHTMap({
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: this.state.cutLayer,
  callback: myMap => {
    console.log(myMap)
  }
})
```

---

```jsx
;<div id="mapContainer" />

new NjHTMap({
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: this.state.cutLayer,
  callback: myMap => {
    console.log(myMap)
  }
})
```

---

```jsx
new NjHTMap({
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: this.state.cutLayer,
  callback: myMap => {
    console.log(myMap)
  }
})
```

---

```jsx
new NjHTMap({
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: this.state.cutLayer,
  callback: myMap => {
    console.log(myMap)
  }
})
```

---

```jsx
new NjHTMap({
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: this.state.cutLayer,
  callback: myMap => {
    console.log(myMap)
  }
})
```

---

```jsx
import { mapTypeEnum } from '../webMap/enum/map_type_enum'

new NjHTMap({
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: map_type_enum.tdt_img_w,
  callback: myMap => {
    console.log(myMap)
  }
})
```

---

```jsx
new NjHTMap({
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: this.state.cutLayer,
  callback: myMap => {
    console.log(myMap)
  }
})
```

---

```jsx
myMap.addEvent('com', eventEnum.LEFT_CLICK, res => {
          console.log(res)
        })

addEvent (name, type, callback) {
    this.eventObj[type].set(name, {
      enable: true,
      fn: callback
    })
  }
```

---

```jsx
addMark = () => {
    let data = []
    for (let i = 0; i < 180; i += 10) {

      for (let j = 0; j < 90; j += 10) {
        let info = {
          cityName: i + ',' + j,
          cityid: i + ',' + j,
          lat: j,
          lon: i,

        }
        let staInfo = new BaseStaInfo(info.cityid, info.cityName, require('../images/weatherIcons/c00.gif'), info.lon, info.lat)
        data.push(staInfo)
        this.citeMap.set(info.cityid, staInfo)
      }

    }
    this.myMap.addMark('city', data, markTypeEnum.PICANDTEXT)
  }

addMark (dataName, data, type, fontSize = 20) {
    if (this.dataSourceMap.has(dataName)) {
      console.warn(errorEnum.EXISTED)
      return
    }

    let width = 20, height = 20, _this = this
    let img = new Image()
    let nullPic = img

    let dataSource = new Cesium.CustomDataSource(dataName)
    dataSource.clustering.enabled = true
    dataSource.clustering.pixelRange = width
    dataSource.clustering.minimumClusterSize = 1
    this.dataSources.add(dataSource)
    this.dataSourceMap.set(dataName, dataSource)

    let statMap = new Map()
    for (let i = 0; i < data.length; i++) {

      let image = nullPic, name = ''
      if (type === markTypeEnum.PICANDTEXT) {
        image = data[i].picUrl
        name = data[i].name
      } else if (type === markTypeEnum.TEXT) {
        name = data[i].name
      } else if (type === markTypeEnum.PIC) {
        image = data[i].picUrl
      }
      let info = {
        id: data[i].id,
        name: name,
        position: Cesium.Cartesian3.fromDegrees(data[i].lon, data[i].lat),
        billboard: {
          image: image,
          width: width,
          height: height
        }
      }
      dataSource.entities.add(info)

      statMap.set(data[i].id, info)

    }

    dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
      cluster.label.show = true
      cluster.label._fontSize = fontSize
      cluster.label._pixelOffset = { x: -10, y: 15 }
      cluster.billboard.show = true
      cluster.billboard.id = cluster.label.id
      cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM

      if (_this.selectMark.needSelect) {
        let myData = false
        for (let i = 0; i < clusteredEntities.length; i++) {
          if (clusteredEntities[i].id === _this.selectMark.id) {
            myData = statMap.get(clusteredEntities[0].id)
            break
          }
        }

        if (myData) {
          cluster.billboard.image = myData.billboard.image
          cluster.label._renderedText = myData.name + ''

          _this.selectMark.needSelect = false
        } else {
          cluster.billboard.image = statMap.get(clusteredEntities[0].id).billboard.image
          cluster.label._renderedText = statMap.get(clusteredEntities[0].id).name + ''
        }
      } else {
        cluster.billboard.image = statMap.get(clusteredEntities[0].id).billboard.image
        cluster.label._renderedText = statMap.get(clusteredEntities[0].id).name + ''
      }
    })

    // force a re-cluster with the new styling
    let pixelRange = dataSource.clustering.pixelRange
    dataSource.clustering.pixelRange = 0
    dataSource.clustering.pixelRange = pixelRange
  }
```

---

```jsx
addPic = () => {
    this.myMap.addPic('myPic', './data/320000000000.png', [118, 32, 133, 45])
  }

addPic (dataName, url, range) {
    if (this.entityMap.has(dataName)) {
      this.entities.remove(this.entityMap.get(dataName))
      this.entityMap.delete(dataName)
    }

    let myData = new Cesium.Entity({
      id: dataName,
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(...range),
        material: url
      }
    })
    this.entities.add(myData)
    this.entityMap.set(dataName, myData)
  }
```

---

```jsx
Cartesian2ToCartesian3 (Cartesian2, is3D) {
    let myCartesian3
    if (is3D) {
      let ray = this.camera.getPickRay(Cartesian2)
      myCartesian3 = this.scene.globe.pick(ray, this.scene)
    } else {
      myCartesian3 = this.camera.pickEllipsoid(Cartesian2, this.scene.globe.ellipsoid)
    }
    return myCartesian3
  }
```

---

```jsx
Cartesian3ToPx (scene, Cartesian3) {
    let myPx = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, Cartesian3)
    return myPx
  }
```

---

```jsx
cartographicRadiansToCartographicDegrees (cartographicRadians) {

    let cartographicDegrees = {
      longitude: Cesium.Math.toDegrees(cartographicRadians.longitude),
      latitude: Cesium.Math.toDegrees(cartographicRadians.latitude),
      height: cartographicRadians.height
    }

    return cartographicDegrees

  }
```

---

```jsx
changeDataIsShow = () => {
    this.myMap.changeDataIsShow('wind', dataTypeEnum.ENTITY, !this.isShow)
    this.isShow = !this.isShow
  }

changeDataIsShow (dataName, type, isShow) {
    switch (type) {
      case dataTypeEnum.constructor:
        let data = this.dataSourceMap.get(dataName)
        if (data) {
          data.show = isShow
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      case dataTypeEnum.ENTITY:
        let myEntity = this.entityMap.get(dataName)
        if (myEntity) {
          myEntity.show = isShow
          this.cahangeDataIsShow(dataName, 1, isShow)
          if (isShow) {
            this.eventObj['WHEEL'].get(dataName).fn()
          }
          this.changeEvent(dataName, 'WHEEL', isShow)
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      case dataTypeEnum.LAYER:
        let layer = this.layerMap.get(dataName)
        if (layer) {
          layer.show = isShow
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      case dataTypeEnum.PRIMITIVE:
        let primitive = this.primitiveMap.get(dataName)
        if (primitive) {
          primitive.windyObj.changeShow(isShow)
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      default:
        break
    }
  }
```

---

```jsx
changeEvent (name, type, enable) {
    this.eventObj[type].get(name).enable = enable
  }
```

---

```jsx
clickEvent () {

    let handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
    handler.setInputAction((evt) => {

      let cartesian = this.Cartesian2ToCartesian3(evt.position, this.is3D)
      if (!cartesian) {
        return
      }
      let cartographic = Cesium.Cartographic.fromCartesian(cartesian)
      let mapPosition = this.cartographicRadiansToCartographicDegrees(cartographic)
      this.eventObj[eventEnum.LEFT_CLICK].forEach(fnObj => {
        if (fnObj && fnObj.enable) {
          fnObj.fn({
            position: mapPosition,
            pickObj: this.scene.pick(evt.position) ? (this.scene.pick(evt.position)).id[0] : false
          })
        }
      })

    }, Cesium.ScreenSpaceEventType[eventEnum.LEFT_CLICK])
  }
```

---

```jsx
contourLine = () => {
    axios.get('./data/line.json').then(res => {
      this.myMap.contourLine('line', res.data)
    })
  }

contourLine (dataName, data, coe = 1, fixed = 0) {
    if (this.entityMap.has(dataName)) {
      console.warn(errorEnum.EXISTED)
      return
    }

    let myCanvasContour = new CanvasContour(this.Cartesian3ToPx, this)
    myCanvasContour.loadData(data)
    let picInfo = myCanvasContour.draw()
    let labelData = []
    let labels = picInfo.labels

    for (let i = 0; i < labels.length; i++) {
      labelData.push(new BaseStaInfo(labels[i].id, (Number(labels[i].name) / coe).toFixed(fixed), '', labels[i].position[1], labels[i].position[0]))

    }
    this.addPic(dataName, picInfo.pic, picInfo.range)//entity
    this.addMark(dataName, labelData, markTypeEnum.TEXT, 15)//dataSource
  }
```

---

```jsx
drawLine = () => {
    let data = [[118, 32], [119, 32], [119, 33]]
    this.myMap.drawLine(data, [0, 0, 255, 1], 10, false)
  }

 drawLine (data, color = [255, 255, 255, 1], width = 5, isDash = false) {

    let myData = []

    for (let i = 0; i < data.length; i++) {
      myData.push(data[i][0], data[i][1])
    }

    this.entities.add({
      // id: index,
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(myData),
        width: width,
        material: isDash ? new Cesium.PolylineDashMaterialProperty({
          color: colorTransform(color)
        }) : colorTransform(color),
        clampToGround: true
      }
    })

    // this.viewer.zoomTo(this.viewer.entities);

  }

```

---

```jsx
drawPlotting = () => {
    let data = []
    for (let i = 0; i < 100; i++) {
      let info = {
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

      let plottingInfo = new BasePlottingInfo(info.id, info.name, [info.position.longitude, info.position.latitude], info.dataInfo)

      data.push(plottingInfo)
      this.statMap.set(info.id, plottingInfo)
    }
    this.myMap.drawPlotting('plottingData', data, plottingTypeEnum.GROUND, 10)
  }

drawPlotting (dataName, data, type = plottingTypeEnum.GROUND, coe = 10) {
    if (this.dataSourceMap.has(dataName)) {
      console.warn(errorEnum.EXISTED)
      return
    }

    let width = 90, height = 90

    function getImg (data) {
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let ctxObj = canvas.getContext('2d')
      let myGroundDraw = new GroundDraw()
      switch (type) {
        case plottingTypeEnum.GROUND:
          myGroundDraw.drawGroundAll(data, ctxObj, 'white', coe)
          break
        case plottingTypeEnum.JD:
          myGroundDraw.drawGroundJD(data, ctxObj, 'white', coe)
          break
        case plottingTypeEnum.HIGH:
          myGroundDraw.drawHigh(data, ctxObj, 'white', coe)
          break
        default:
          myGroundDraw.drawGroundAll(data, ctxObj, 'white', coe)
          break
      }

      return canvas
    }

    let dataSource = new Cesium.CustomDataSource(dataName)
    dataSource.clustering.enabled = true
    dataSource.clustering.pixelRange = width
    dataSource.clustering.minimumClusterSize = 1
    this.dataSources.add(dataSource)
    this.dataSourceMap.set(dataName, dataSource)

    let statMap = new Map()
    for (let i = 0; i < data.length; i++) {

      if (!statMap.has(data[i].id)) {
        let info = {
          id: data[i].id,
          name: data[i].name,
          position: Cesium.Cartesian3.fromDegrees(data[i].position.longitude, data[i].position.latitude),
          billboard: {
            image: getImg(data[i]),
            width: width,
            height: height
          }
        }
        dataSource.entities.add(info)

        statMap.set(info.id, info)
      }

    }

    let _this = this

    dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
      cluster.label.show = true
      cluster.label._fontSize = 15
      cluster.label._pixelOffset = { x: -15, y: 20 }
      cluster.billboard.show = true
      cluster.billboard.id = cluster.label.id
      cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM

      if (_this.selectPlotting.needSelect) {
        let myData = false
        for (let i = 0; i < clusteredEntities.length; i++) {
          if (clusteredEntities[i].id === _this.selectPlotting.id) {
            myData = statMap.get(clusteredEntities[0].id)
            break
          }
        }

        if (myData) {
          cluster.billboard.image = myData.billboard.image
          cluster.label._renderedText = myData.name + ''

          _this.selectPlotting.needSelect = false
        } else {
          cluster.billboard.image = statMap.get(clusteredEntities[0].id).billboard.image
          cluster.label._renderedText = statMap.get(clusteredEntities[0].id).name + ''
        }
      } else {
        cluster.billboard.image = statMap.get(clusteredEntities[0].id).billboard.image
        cluster.label._renderedText = statMap.get(clusteredEntities[0].id).name + ''
      }
    })

    // force a re-cluster with the new styling
    let pixelRange = dataSource.clustering.pixelRange
    dataSource.clustering.pixelRange = 0
    dataSource.clustering.pixelRange = pixelRange
  }
```

---

```jsx
drawPlottingLocation = () => {
    let id = Math.floor(Math.random() * 100)
    if (this.statMap.has(id)) {
      let position = this.statMap.get(id).position

      this.myMap.drawPlottingLocation(id, [position.longitude, position.latitude])
    } else {
      console.warn(errorEnum.NOPLOTTING)
    }

  }

drawPlottingLocation (id, postion) {
    this.selectPlotting = {
      needSelect: true,//是否选中
      id: id//选中的填图对象id
    }

    this.setView([...postion, 1000000])
  }
```

---

```jsx
drawPoint = () => {
    let pointData = [[118, 32], [119, 32]]
    this.myMap.drawPoint(pointData)
  }

drawPoint (data) {
    let pointCzml = returnCzmlPoint(data)

    let dataSourcePromise = Cesium.CzmlDataSource.load(pointCzml)
    this.dataSources.add(dataSourcePromise)
  }
```

---

```jsx
drawPolygon = () => {
    let data = [[118, 32, 0], [119, 32, 0], [119, 33, 0], [118, 32, 0]]
    this.myMap.drawPolygon(data)
  }

drawPolygon (data) {
    let polygonCzml = returnCzmlPolygon(data)
    let dataSourcePromise = Cesium.CzmlDataSource.load(polygonCzml)
    this.dataSources.add(dataSourcePromise)
  }
```

---

```jsx
flow = () => {
    axios.get('/MeteOceanFiles/ImgProdcut/EuropeHandler/wind/20190922/ec_20190922200000_wind_1_0_10_fill.json').then(res => {
      this.myMap.flow('myFlow', res.data, 0.005)
    })
  }

flow (dataName, data, coe = 1) {
    if (this.primitiveMap.has(dataName)) {
      console.warn(errorEnum.EXISTED)
      return
    }

    let windy = new Windy(this.scene.primitives)

    this.primitiveMap.set(dataName, {
      windyObj: windy,
      primitivesObj: this.scene.primitives
    })

    windy.loadData(data)
    windy.initParticles(coe)
    windy.startWindy()
  }
```

---

```jsx
getViewCentre () {
    let myCartographic = this.camera._positionCartographic
    let mapPosition = this.cartographicRadiansToCartographicDegrees(myCartographic)
    return mapPosition

  }
```

---

```jsx
in = () => {
    this.myMap.in()
  }

in () {
    this.camera.zoomIn()
  }
```

---

```jsx
init = () => {
    this.myMap.init()
  }

init (isFly = false) {
    this.setView(this.initPostion, isFly)
  }
```

---

```jsx
initBaseLayer (mapType) {
    /* 在线天地图墨卡托投影 START */
    // 影像图
    const tdt_img_w = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_w.MAP_IMG,
      layer: 'tdt_img_w',
      credit: 'tdt_img_w',
      style: 'default',
      format: 'image/png',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 20,
      minimumLevel: 0,
      tileMatrixSetID: 'GoogleMapsCompatible' // 一般使用EPSG:3857坐标系
    })

    // 影像图标注
    const tdt_cia_w = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_w.MAP_CIA,
      layer: 'tdt_img_w_cia',
      credit: 'tdt_img_w_cia',
      style: 'default',
      format: 'image/png',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 20,
      minimumLevel: 0,
      tileMatrixSetID: 'GoogleMapsCompatible' // 一般使用EPSG:3857坐标系
    })

    // 矢量地图
    const tdt_vec_w = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_w.MAP_VEC,
      layer: 'tdt_vec_w',
      credit: 'tdt_vec_w',
      style: 'default',
      format: 'image/png',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 20,
      minimumLevel: 0,
      tileMatrixSetID: 'GoogleMapsCompatible' // 一般使用EPSG:3857坐标系
    })

    // 矢量地图标注
    const tdt_cva_w = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_w.MAP_CVA,
      layer: 'tdt_vec_w_cva',
      credit: 'tdt_vec_w_cva',
      style: 'default',
      format: 'image/png',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 20,
      minimumLevel: 0,
      tileMatrixSetID: 'GoogleMapsCompatible' // 一般使用EPSG:3857坐标系
    })
    /* 在线天地图墨卡托投影 END */

    /* 在线谷歌地图 START */
    // 影像地图
    const google_img = new Cesium.UrlTemplateImageryProvider({
      url: onLineGoogleLayers.MAP_IMG,
      credit: 'google_img',
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 1,
      maximumLevel: 20
    })

    // 地图标注
    const google_cia = new Cesium.UrlTemplateImageryProvider({
      url: onLineGoogleLayers.MAP_CIA,
      credit: 'google_img_cia',
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 1,
      maximumLevel: 20
    })

    // 矢量地图
    const google_vec = new Cesium.UrlTemplateImageryProvider({
      url: onLineGoogleLayers.MAP_VEC,
      credit: 'google_vec',
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 1,
      maximumLevel: 20
    })
    /* 谷歌在线地图 END */

    /* 高德在线地图 START */
    // 影像地图
    const gaode_img = new Cesium.UrlTemplateImageryProvider({
      url: onLineGaodeLayers.MAP_IMG,
      credit: 'gaode_img',
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 1,
      maximumLevel: 20
    })

    // 地图标注
    const gaode_cia = new Cesium.UrlTemplateImageryProvider({
      url: onLineGaodeLayers.MAP_CIA,
      credit: 'gaode_img_cia',
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 1,
      maximumLevel: 20
    })

    // 矢量地图
    const gaode_vec = new Cesium.UrlTemplateImageryProvider({
      url: onLineGaodeLayers.MAP_VEC,
      credit: 'gaode_vec',
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 1,
      maximumLevel: 20
    })
    /* 高德在线地图 END */

    /* 在线天地图等经纬 START */
    // 影像图
    const tdt_img_c = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_c.MAP_IMG,
      layer: 'tdt_img_c',
      credit: 'tdt_img_c',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'c',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      tilingScheme: new Cesium.GeographicTilingScheme(),
      tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      maximumLevel: 20
    })

    // 影像图标注
    const tdt_cia_c = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_c.MAP_CIA,
      layer: 'tdt_img_cia_c',
      credit: 'tdt_img_cia_c',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'c',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      tilingScheme: new Cesium.GeographicTilingScheme(),
      tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      maximumLevel: 20
    })

    // 矢量地图
    const tdt_vec_c = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_c.MAP_VEC,
      layer: 'tdt_vec_c',
      credit: 'tdt_vec_c',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'c',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      tilingScheme: new Cesium.GeographicTilingScheme(),
      tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      maximumLevel: 20
    })

    // 矢量地图标注
    const tdt_cva_c = new Cesium.WebMapTileServiceImageryProvider({
      url: onLineTdtLayers_c.MAP_CVA,
      layer: 'tdt_vec_cva_c',
      credit: 'tdt_vec_cva_c',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'c',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      tilingScheme: new Cesium.GeographicTilingScheme(),
      tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      maximumLevel: 20
    })
    /* 在线天地图等经纬 END */

    /* 离线天地图等经纬 START */
    // 影像图
    const tdt_img_off = new Cesium.WebMapTileServiceImageryProvider({
      url: offLineTdtLayers.MAP_IMG,
      layer: 'tdt_img_off',
      credit: 'tdt_img_off',
      style: '',
      format: 'image/png',
      maximumLevel: 20,
      minimumLevel: 0,
      tileMatrixSetID: 'EPSG:4326', // 一般使用EPSG:3857坐标系
      tilingScheme: new Cesium.GeographicTilingScheme(),
      tileMatrixLabels: [
        'EPSG:4326:0',
        'EPSG:4326:1',
        'EPSG:4326:2',
        'EPSG:4326:3',
        'EPSG:4326:4',
        'EPSG:4326:5',
        'EPSG:4326:6',
        'EPSG:4326:7',
        'EPSG:4326:8',
        'EPSG:4326:9',
        'EPSG:4326:10',
        'EPSG:4326:11'
      ]
    })

    // 矢量地图
    const tdt_vec_off = new Cesium.WebMapTileServiceImageryProvider({
      url: offLineTdtLayers.MAP_VEC,
      layer: 'tdt_vec_off',
      credit: 'tdt_vec_off',
      style: '',
      format: 'image/png',
      maximumLevel: 20,
      minimumLevel: 0,
      tileMatrixSetID: 'EPSG:4326', // 一般使用EPSG:3857坐标系
      tilingScheme: new Cesium.GeographicTilingScheme(),
      tileMatrixLabels: [
        'EPSG:4326:0',
        'EPSG:4326:1',
        'EPSG:4326:2',
        'EPSG:4326:3',
        'EPSG:4326:4',
        'EPSG:4326:5',
        'EPSG:4326:6',
        'EPSG:4326:7',
        'EPSG:4326:8',
        'EPSG:4326:9',
        'EPSG:4326:10',
        'EPSG:4326:11'
      ]
    })
    /* 离线天地图等经纬 END */
    this.imageryLayers.removeAll()
    if (mapParams.isNet) {
      this.imageryLayers.addImageryProvider(tdt_vec_w, 0) // 在线天地图墨卡托矢量
      this.imageryLayers.addImageryProvider(tdt_cva_w, 1) // 在线天地图墨卡托矢量标注
      this.imageryLayers.addImageryProvider(tdt_img_w, 2) // 在线天地图墨卡托影像
      this.imageryLayers.addImageryProvider(tdt_cia_w, 3) // 在线天地图墨卡托影像标注

      this.imageryLayers.addImageryProvider(google_vec, 4) // 在线谷歌地图矢量
      this.imageryLayers.addImageryProvider(google_img, 5) // 在线谷歌地图影像
      this.imageryLayers.addImageryProvider(google_cia, 6) // 在线谷歌地图影像标注

      this.imageryLayers.addImageryProvider(gaode_vec, 7) // 在线高德地图矢量
      this.imageryLayers.addImageryProvider(gaode_img, 8) // 在线高德地图影像
      this.imageryLayers.addImageryProvider(gaode_cia, 9) // 在线高德地图影像标注
      this.baseMap = [
        tdt_vec_w,
        tdt_cva_w,
        tdt_img_w,
        tdt_cia_w,
        google_vec,
        google_img,
        google_cia,
        gaode_vec,
        gaode_img,
        gaode_cia
      ]
    } else {
      this.imageryLayers.addImageryProvider(tdt_img_off, 0) // 离线天地图矢量
      this.imageryLayers.addImageryProvider(tdt_vec_off, 1) // 离线天地图影像
      this.baseMap = [
        tdt_img_off,
        tdt_vec_off
      ]
    }

    const imageryLayers = this.imageryLayers._layers
    for (let i = 0; i < imageryLayers.length; i++) {
      if (imageryLayers[i]._imageryProvider._credit._html.indexOf(mapType) !== -1) {
        continue
      } else {
        imageryLayers[i].show = false
      }
    }
  }
```

---

```jsx
loadServer = () => {
    let style = returnEleStyle(productEnum.NDVI)
    let searchInfo = '2019-09-21T12:00:00.003Z'//NDVI
    // let searchInfo = '2019-09-21T12:00:00.006Z'//TVDI
    // let searchInfo = '2019-09-21T12:00:00.009Z'//WA

    this.myMap.loadServer('NDVI', ELECONFIG.NDVI.url, ELECONFIG.NDVI.layerName, searchInfo, style)
  }

loadServer (layerName, url, layers, time, sld) {

    if (this.layerMap.has(layerName)) {
      console.warn(errorEnum.EXISTED)
      return
    }

    const wmsProvider = new Cesium.WebMapServiceImageryProvider({
      url: url,
      layers: layers,
      parameters: {
        service: 'WMS',
        format: 'image/png',
        transparent: true,
        time: time,
        sld_body: sld
      }
    })
    const wmsLayer = new Cesium.ImageryLayer(wmsProvider)
    this.imageryLayers.add(wmsLayer)
    this.layerMap.set(layerName, wmsLayer)
  }
```

---

```jsx
markLocation = () => {
    let id = '120,40'
    if (this.citeMap.has(id)) {
      this.myMap.markLocation(id, [this.citeMap.get(id).lon, this.citeMap.get(id).lat])
    } else {
      console.warn(errorEnum.NOMARK)
    }

  }

markLocation (id, postion) {
    this.selectMark = {
      needSelect: true,//是否选中
      id: id//选中的填图对象id
    }

    this.setView([...postion, 1000000])
  }
```

---

```jsx
out = () => {
    this.myMap.out()
  }

out () {
    this.camera.zoomOut()
  }
```

---

```jsx
removeData = () => {
    this.myMap.removeData('wind', dataTypeEnum.ENTITY)
  }

removeData (dataName, type) {
    switch (type) {
      case dataTypeEnum.DATASOURCE:
        let data = this.dataSourceMap.get(dataName)
        if (data) {
          this.dataSources.remove(data, true)
          this.dataSourceMap.delete(dataName)
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      case dataTypeEnum.ENTITY:
        let myEntity = this.entityMap.get(dataName)
        if (myEntity) {
          this.entities.remove(myEntity)
          this.entityMap.delete(dataName)
          this.removeData(dataName, 1)
          this.removeEvent(dataName, 'WHEEL')
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      case dataTypeEnum.LAYER:
        let layer = this.layerMap.get(dataName)
        if (layer) {
          this.imageryLayers.remove(layer, true)
          this.layerMap.delete(dataName)
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      case dataTypeEnum.PRIMITIVE:
        let primitive = this.primitiveMap.get(dataName)
        if (primitive) {
          primitive.windyObj.stopWindy()
          let needRemove = []
          for (let i = 0; i < primitive.primitivesObj.length; i++) {
            let p = primitive.primitivesObj.get(i)
            if (!p._primitives) {
              needRemove.push(p)
            }
          }

          for (let i = 0; i < needRemove.length; i++) {
            primitive.primitivesObj.remove(needRemove[i])
          }
        } else {
          console.warn(errorEnum.ABSENCE)
        }
        break
      default:
        break
    }

  }
```

---

```jsx
removeEvent (name, type) {
    this.eventObj[type].delete(name)
  }
```

---

```jsx
setView = () => {
    this.myMap.setView([118, 33], true)
  }
setView (postion, isFly = false) {
    if (isFly) {
      this.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(postion[0], postion[1], postion[2] ? postion[2] : this.camera.positionCartographic.height), // 设置位置
      })
    } else {
      this.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(postion[0], postion[1], postion[2] ? postion[2] : this.camera.positionCartographic.height), // 设置位置
      })
    }

  }
```

---

```jsx
switchMap = (value) => {
    if (this.state.cutLayer === value) {
      return
    }
    this.setState({
      cutLayer: value
    })

    this.myMap.switchBaseMap(value)
  }

switchBaseMap (mapType) {
    const imageryLayers = this.imageryLayers._layers
    for (let i = 0; i < this.baseMap.length; i++) {
      if (imageryLayers[i]._imageryProvider._credit._html.indexOf(mapType) !== -1) {
        imageryLayers[i].show = true
      } else {
        imageryLayers[i].show = false
      }
    }
  }
```

---

```jsx
text = () => {
    for (let i = 0; i < 100; i++) {
      this.myMap.text('data' + i, 0.5, [118, 32 + 0.1 * i], [255, 0, 0, 1])
    }

  }

text (data, size = 1, postion = [0, 0], color = [0, 0, 0, 1]) {
    this.entities.add({
      position: Cesium.Cartesian3.fromDegrees(postion[0], postion[1]),
      label: {
        text: data,
        scale: size,
        fillColor: colorTransform(color),
      }
    })
  }
```

---

```jsx
wheelEvent () {

    let handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
    handler.setInputAction((evt) => {
      this.eventObj[eventEnum.WHEEL].forEach(fnObj => {
        if (fnObj && fnObj.enable) {
          fnObj.fn()
        }
      })
    }, Cesium.ScreenSpaceEventType[eventEnum.WHEEL])
  }
```

---

```jsx
wind = () => {
    axios.get('./data/wind.json').then(res => {
      this.myMap.wind('wind', windTypeEnum.FEATHER, res.data)
    })

  }

wind (dataName, type, data) {
    if (this.entityMap.has(dataName)) {
      console.warn(errorEnum.EXISTED)
      return
    }

    let _this = this
    let myCanvasWind = new CanvasWind(this.Cartesian3ToPx, this)
    myCanvasWind.loadData(data)
    drawWind()

    this.addEvent(dataName, eventEnum.WHEEL, () => {
      drawWind()
    })

    function drawWind () {
      let picInfo = myCanvasWind.draw(type, getStep())
      _this.addPic(dataName, picInfo.pic, picInfo.range)
    }

    function getStep () {
      let resultl
      let eyePosition = (_this.getViewCentre()).height
      // 风场间隔 TODO 需要结合数据分辨率确定
      if (eyePosition >= 1e7) {
        resultl = 4
      } else if (eyePosition > 5e6) {
        resultl = 2
      } else {
        resultl = 1
      }
      return resultl
    }
  }
```
