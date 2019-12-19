```jsx
import {
  mapParams,
  offLineTdtLayers,
  onLineGaodeLayers,
  onLineGoogleLayers,
  onLineTdtLayers_c,
  onLineTdtLayers_w
} from './config/mapConfig'
```

---

```jsx
const mapParams = {
  isNet: true, // 是否在线 true: 在线，false: 离线
  // mapType: 'google_img',
  /**
   * 地图类型
   * @param google_vec 在线谷歌矢量地图
   * @param google_img 在线谷歌影像地图
   * @param gaode_vec 在线高德矢量地图
   * @param gaode_img 在线高德影像地图
   * @param tdt_vec_w 在线天地图矢量（墨卡托）
   * @param tdt_img_w 在线天地图影像（墨卡托）
   * @param tdt_vec_off 离线天地图矢量（等经纬）
   * @param tdt_img_off 离线天地图影像（等经纬）
   */
  cors: 'EPSG:4326', // 坐标系 EPSG:4326, EPSG:3857
  center: {
    x: 110.8366667,
    y: 32.97916667,
    h: 15115000.0
  }
}
```

---

```jsx
const onLineTdtLayers_w = {
  MAP_IMG: 'http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default&format=tiles&tk=4aef299f1178a8329a9cdc325a055b85', // 在线天地图影像服务地址(墨卡托投影)
  MAP_CIA: 'http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default.jpg&tk=4aef299f1178a8329a9cdc325a055b85', // 在线天地图影像中文标记服务(墨卡托投影)
  MAP_VEC: 'http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default&format=tiles&tk=4aef299f1178a8329a9cdc325a055b85', // 在线天地图矢量地图服务(墨卡托投影)
  MAP_CVA: 'http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default.jpg&tk=4aef299f1178a8329a9cdc325a055b85' // 在线天地图矢量中文标记服务(墨卡托投影)
}
```

---

```jsx
const onLineTdtLayers_c = {
  MAP_IMG: 'http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default&format=tiles&tk=4aef299f1178a8329a9cdc325a055b85', // 在线天地图影像服务地址(经纬度)
  MAP_CIA: 'http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default.jpg&tk=4aef299f1178a8329a9cdc325a055b85', // 在线天地图影像中文标记服务(经纬度)
  MAP_VEC: 'http://{s}.tianditu.gov.cn/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default&format=tiles&tk=4aef299f1178a8329a9cdc325a055b85', // 在线天地图矢量地图服务(经纬度)
  MAP_CVA: 'http://{s}.tianditu.gov.cn/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0' +
    '&LAYER=cva&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}' +
    '&style=default.jpg&tk=4aef299f1178a8329a9cdc325a055b85' // 在线天地图矢量中文标记服务(经纬度)
}
```

---

```jsx
const onLineGoogleLayers = {
  MAP_IMG: 'http://www.google.cn/maps/vt?lyrs=s@800&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
  MAP_VEC: 'http://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil',
  MAP_CIA: 'http://www.google.cn/maps/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil',
  MAP_TER: 'http://www.google.cn/maps/vt?lyrs=r@205000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil'
}
```

---

```jsx
const onLineGaodeLayers = {
  MAP_IMG: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  MAP_VEC: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  MAP_CIA: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
}
```

---

```jsx
const offLineTdtLayers = {
  MAP_IMG: 'http://192.168.1.236:16080/geoserver/gwc/service/wmts?&layer=hthtmap:tdt_img_11&style=&Service=WMTS&Request=GetTile&version=1.1.0&format=image/png&tileMatrixSet=EPSG:4326&TileMatrix={TileMatrix}&tileRow={TileRow}&tileCoL={TileCol}',
  MAP_VEC: 'http://192.168.1.236:16080/geoserver/gwc/service/wmts?&layer=hthtmap:tdt_map_11&style=&Service=WMTS&Request=GetTile&version=1.1.0&format=image/png&tileMatrixSet=EPSG:4326&TileMatrix={TileMatrix}&tileRow={TileRow}&tileCoL={TileCol}',
  MAP_CIA: 'http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
  MAP_TER: 'http://192.168.1.236:16080/geoserver/gwc/service/wmts?&layer=hthtmap:tdt_terrain_11&style=&Service=WMTS&Request=GetTile&version=1.1.0&format=image/png&tileMatrixSet=EPSG:4326&TileMatrix={TileMatrix}&tileRow={TileRow}&tileCoL={TileCol}'
}
```
