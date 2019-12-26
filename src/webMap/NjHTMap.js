import Viewer from 'cesium/Source/Widgets/Viewer/Viewer'
import Cesium from 'cesium/Source/Cesium'
import {
    mapParams,
    offLineTdtLayers,
    onLineGaodeLayers,
    onLineGoogleLayers,
    onLineTdtLayers_c,
    onLineTdtLayers_w
} from './config/mapConfig'
import {eventEnum} from './enum/event_enum'
import {errorEnum} from './enum/error_enum'
import {markTypeEnum} from './enum/mark_type_enum'
import {plottingTypeEnum} from './enum/plotting_type_enum'
import {mapTypeEnum} from './enum/map_type_enum'
import {dataTypeEnum} from './enum/data_type_enum'
import CanvasContour from './model/canvas_contour'
import BaseStaInfo from './entity/BaseStaInfo'
import Windy from './model/windy'
import GroundDraw from './model/GroundDraw'
import CanvasWind from './model/canvas_wind'

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NWI5MGUzNi1mYWI3LTQzY2QtOGI0Ni0xZWYyNTAxNGM4N2MiLCJpZCI6MTI1OTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjE0NDkyNTV9.hBH0PGSnKErc_yNhIePASUkr3QPDoo0KDX9uLpNBUns'

/*
* domId:容器id
* initPostion：初始化位置 [118, 33, 1000000]
* is3D：是否是3D
* isFly:是否飞行
* mapType:地图类型
* callback:用于绑定事件
* */
export default class NjHTMap extends Viewer {
    constructor({domId = 'mapContainer', initPostion = [118, 33, 1000000], is3D = true, isFly = false, mapType = mapTypeEnum[0].key, callback}) {
        super(domId, {
            sceneMode: is3D ? Cesium.SceneMode.SCENE3D : Cesium.SceneMode.SCENE2D,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
        })

        this.initPostion = initPostion
        this.is3D = is3D//当前地图是否是3D
        this.init(isFly)

        // 初始底图对象
        this.initBaseLayer(mapType)

        this.selectPlotting = {
            needSelect: false,//是否需要选中
            id: false//选中的填图对象id
        }

        this.selectMark = {
            needSelect: false,//是否需要选中
            id: false//选中的markid
        }

        this.dataSourceMap = new Map()//存放dataSource的Map
        this.layerMap = new Map()//存放layer的Map
        this.entityMap = new Map()//存放entity的Map
        this.primitiveMap = new Map()//存放primitive的Map

        this.eventObj = {
            [eventEnum.LEFT_CLICK]: new Map(),
            [eventEnum.WHEEL]: new Map(),
        }
        this.clickEvent()
        this.wheelEvent()

        if (callback) {
            callback(this)
        }
    }

    /*
  * 增加事件
  * */
    addEvent(name, type, callback) {
        this.eventObj[type].set(name, {
            enable: true,
            fn: callback
        })
    }

    /*
  * 加载mark点
  *  dataName:数据名
  * data：数据
  * type：
  * */
    addMark(dataName, data, type, fontSize = 20) {
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
            cluster.label._pixelOffset = {x: -10, y: 15}
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

    /*
  * 贴图
  * dataName:数据名‘’
  * url:图片路径'./'
  * range:图片范围[118, 32, 119, 33]
  * */
    addPic(dataName, url, range) {
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

    /*
    * Cartesian2转Cartesian3
    * */
    Cartesian2ToCartesian3(Cartesian2, is3D) {
        let myCartesian3
        if (is3D) {
            let ray = this.camera.getPickRay(Cartesian2)
            myCartesian3 = this.scene.globe.pick(ray, this.scene)
        } else {
            myCartesian3 = this.camera.pickEllipsoid(Cartesian2, this.scene.globe.ellipsoid)
        }
        return myCartesian3
    }

    /*
  * Cartesian3转屏幕坐标
  * */
    Cartesian3ToPx(scene, Cartesian3) {
        let myPx = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, Cartesian3)
        return myPx
    }

    /*
  * 地表弧度坐标转地表经纬度
  * */
    cartographicRadiansToCartographicDegrees(cartographicRadians) {

        let cartographicDegrees = {
            longitude: Cesium.Math.toDegrees(cartographicRadians.longitude),
            latitude: Cesium.Math.toDegrees(cartographicRadians.latitude),
            height: cartographicRadians.height
        }

        return cartographicDegrees

    }

    /*
  * 改变显隐
  * dataName:
  * type:类型dataSource(填图、mark点)  entity（贴图、风羽、等值线） layer（服务） primitive（粒子）
  * isShow:是否显示
  * */
    changeDataIsShow(dataName, type, isShow) {
        switch (type) {
            case dataTypeEnum.DATASOURCE:
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
                    this.changeDataIsShow(dataName, dataTypeEnum.DATASOURCE, isShow)
                    if (isShow && this.eventObj[eventEnum.WHEEL].get(dataName)) {
                        this.eventObj[eventEnum.WHEEL].get(dataName).fn()
                    }
                    this.changeEvent(dataName, eventEnum.WHEEL, isShow)
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

    /*
  * 改变事件是否可用
  * */
    changeEvent(name, type, enable) {
        if (this.eventObj[type].get(name)) {
            this.eventObj[type].get(name).enable = enable
        }

    }

    /*
    * 点击事件
    * */
    clickEvent() {

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

    /*
    * 等值线
    * dataName：数据名
    * data：完整数据
    * coe:数据系数
    * fixed:保留小数位数
    * */
    contourLine(dataName, data, coe = 1, fixed = 0) {
        if (this.entityMap.has(dataName)) {
            console.warn(errorEnum.EXISTED)
            return
        }

        let myCanvasContour = new CanvasContour({Cartesian3ToPx: this.Cartesian3ToPx, viewer: this})
        myCanvasContour.loadData(data)
        let picInfo = myCanvasContour.draw()
        let labelData = []
        let labels = picInfo.labels

        for (let i = 0; i < labels.length; i++) {
            labelData.push(new BaseStaInfo({
                id: labels[i].id,
                name: (Number(labels[i].name) / coe).toFixed(fixed),
                picUrl: '',
                lon: labels[i].position[1],
                lat: labels[i].position[0]
            }))

        }
        this.addPic(dataName, picInfo.pic, picInfo.range)//entity
        this.addMark(dataName, labelData, markTypeEnum.TEXT, 15)//dataSource
    }

    /*
  * 画线
  * data：数据[[118,32],[119,32]]
  * color:颜色 [255,255,255,1]
  * width:宽度
  * isDash：是否是虚线
  * */
    drawLine(data, color = [255, 255, 255, 1], width = 5, isDash = false) {

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

    /*
    * 填图
    * dataName:数据名
    * data：数据
    * type:填图类型
    * coe:数据缩放系数
    * */
    drawPlotting(dataName, data, type = plottingTypeEnum.GROUND, coe = 10) {
        if (this.dataSourceMap.has(dataName)) {
            console.warn(errorEnum.EXISTED)
            return
        }

        let width = 90, height = 90

        function getImg(data) {
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
            cluster.label._pixelOffset = {x: -15, y: 20}
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

    /*
   * 填图定位
   * id:站点id
   * postion:站点的经纬度[lon,lat]
   * */
    drawPlottingLocation(id, postion) {
        this.selectPlotting = {
            needSelect: true,//是否选中
            id: id//选中的填图对象id
        }

        this.setView([...postion, 1000000])
    }

    /*
    * 画点
    * data：数据[[118,32,0],[119,32,0]]
    * */
    drawPoint(data) {
        let pointCzml = returnCzmlPoint(data)

        let dataSourcePromise = Cesium.CzmlDataSource.load(pointCzml)
        this.dataSources.add(dataSourcePromise)
    }

    /*
  * 画面
  * data：数据[[118,32,0],[119,32,0],[119,33,0],[118,32,0]]
  * */
    drawPolygon(data) {
        let polygonCzml = returnCzmlPolygon(data)
        let dataSourcePromise = Cesium.CzmlDataSource.load(polygonCzml)
        this.dataSources.add(dataSourcePromise)
    }

    /*
  * 流场
  * dataName:自定义名
  *data:数据
  * coe:速度系数
  * */
    flow(dataName, data, coe = 1) {
        if (this.primitiveMap.has(dataName)) {
            console.warn(errorEnum.EXISTED)
            return
        }

        let windy = new Windy({cesiumPrimitives: this.scene.primitives})

        this.primitiveMap.set(dataName, {
            windyObj: windy,
            primitivesObj: this.scene.primitives
        })

        windy.loadData(data)
        windy.initParticles(coe)
        windy.startWindy()
    }

    /*
  * 获取当前视野中心
  * */
    getViewCentre() {
        let myCartographic = this.camera._positionCartographic
        let mapPosition = this.cartographicRadiansToCartographicDegrees(myCartographic)
        return mapPosition

    }

    //放大
    in() {
        this.camera.zoomIn()
    }

    /*
    * 恢复
    * isFly:是否飞行
    * */
    init(isFly = false) {
        this.setView(this.initPostion, isFly)
    }

    /**
     * 初始化地图
     * mapType:地图类型
     */
    initBaseLayer(mapType) {
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

    /*
  * 加载服务
  * layerName:自定义图层名
  * url：服务url
  * layers：发布服务的名
  * sld：渲染样式
  * */
    loadServer(layerName, url, layers, time, sld) {

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

    /*
  * mark定位
  * id:站点id
  * postion:站点的经纬度[lon,lat]
  * */
    markLocation(id, postion) {
        this.selectMark = {
            needSelect: true,//是否选中
            id: id//选中的填图对象id
        }

        this.setView([...postion, 1000000])
    }

    //缩小
    out() {
        this.camera.zoomOut()
    }

    /*
  * 移除data
  * dataName:移除data的名字
  * type:类型dataSource(填图、mark点)   entity（贴图、风羽、等值线）  layer（服务） primitive（粒子）
  * */
    removeData(dataName, type) {
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
                    this.removeData(dataName, dataTypeEnum.DATASOURCE)
                    this.removeEvent(dataName, eventEnum.WHEEL)
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

    /*
    * 移除监听事件
    * */
    removeEvent(name, type) {
        this.eventObj[type].delete(name)
    }

    /*
     * 视角定位
     *postion：位置 [118, 33, 1000000]||[118, 33]
     * isFly:是否飞行
     * */
    setView(postion, isFly = false) {
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

    /**
     * 地图切换
     * @param mapType 地图类型
     */
    switchBaseMap(mapType) {
        const imageryLayers = this.imageryLayers._layers
        for (let i = 0; i < this.baseMap.length; i++) {
            if (imageryLayers[i]._imageryProvider._credit._html.indexOf(mapType) !== -1) {
                imageryLayers[i].show = true
            } else {
                imageryLayers[i].show = false
            }
        }
    }

    /*
  * 文字
  * data：数据
  * */
    text(data, size = 1, postion = [0, 0], color = [0, 0, 0, 1]) {
        this.entities.add({
            position: Cesium.Cartesian3.fromDegrees(postion[0], postion[1]),
            label: {
                text: data,
                scale: size,
                fillColor: colorTransform(color),
            }
        })
    }

    /*
   * 点击滚轮事件
   * */
    wheelEvent() {

        let handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
        handler.setInputAction((evt) => {
            this.eventObj[eventEnum.WHEEL].forEach(fnObj => {
                if (fnObj && fnObj.enable) {
                    fnObj.fn()
                }
            })
        }, Cesium.ScreenSpaceEventType[eventEnum.WHEEL])
    }

    /*
   * 风场
   * dataName:自定义数据名
   * type：类型1：风羽，2：箭头
   * data：数据
   * */
    wind(dataName, type, data) {
        if (this.entityMap.has(dataName)) {
            console.warn(errorEnum.EXISTED)
            return
        }

        let _this = this
        let myCanvasWind = new CanvasWind({Cartesian3ToPx: this.Cartesian3ToPx, viewer: this})
        myCanvasWind.loadData(data)
        drawWind()

        this.addEvent(dataName, eventEnum.WHEEL, () => {
            drawWind()
        })

        function drawWind() {
            let picInfo = myCanvasWind.draw(type, getStep())
            _this.addPic(dataName, picInfo.pic, picInfo.range)
        }

        function getStep() {
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
}

function returnCzmlPoint(data) {

    let czml = [{
        'id': 'document',
        'name': 'CZML Position Definitions',
        'version': '1.0'
    }]

    for (let i = 0; i < data.length; i++) {
        czml.push({
            'id': 'point' + i,
            'name': 'point in cartographic degrees',
            'position': {
                'cartographicDegrees': [data[i][0], data[i][1], data[i][2] ? data[i][2] : 1]
            },
            'point': {
                'color': {
                    'rgba': [100, 0, 200, 255]
                },
                'outlineColor': {
                    'rgba': [200, 0, 200, 255]
                },
                'pixelSize': {
                    'number': 10
                }
            }
        })
    }

    return czml
}

/*
* 颜色格式转化
* [255,255,255,1]=>[1,1,1,1]
* */
function colorTransform(color) {
    return new Cesium.Color(color[0] / 255, color[1] / 255, color[2] / 255, color[3])
}

function returnCzmlPolygon(data) {

    let myData = []

    for (let i = 0; i < data.length; i++) {
        myData.push(data[i][0], data[i][1], data[i][2] ? data[i][2] : 1)
    }

    let czml = [{
        'id': 'document',
        'name': 'CZML Geometries: Polygon',
        'version': '1.0'
    }, {
        'id': 'redPolygon',
        'name': 'Red polygon on surface',
        'polygon': {
            'positions': {
                'cartographicDegrees': myData
            },
            'material': {
                'solidColor': {
                    'color': {
                        'rgba': [255, 0, 0, 255]
                    }
                }
            }
        }
    }]

    return czml
}
