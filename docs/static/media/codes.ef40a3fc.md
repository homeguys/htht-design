```jsx
import CanvasWind from './model/canvas_wind'
```

---

```jsx
new CanvasWind({Cartesian3ToPx:this.Cartesian3ToPx, viewer:this})
```

---

```jsx
new CanvasWind({Cartesian3ToPx:this.Cartesian3ToPx, viewer:this})
```

---

```jsx
new CanvasWind({Cartesian3ToPx:this.Cartesian3ToPx, viewer:this})
```

---

```jsx
loadData (windData) {
    this.dataInfo = {
      LonMin: windData.header.lo1,
      LatMin: windData.header.la1,
      LonNums: windData.header.nx,
      LatNums: windData.header.ny,
      LonStep: windData.header.dx,
      LatStep: windData.header.dy,
      DLon: (windData.header.nx - 1) * windData.header.dx,
      DLat: (windData.header.ny - 1) * windData.header.dy,

      UV: [], // UV分量 0-U 1-V UV方向同笛卡尔坐标系
      Wind: []// 风向风速 0-风向 1-风速
    }
    this.dataInfo.LonMax = windData.header.lo1 + this.dataInfo.DLon
    this.dataInfo.LatMax = windData.header.la1 + this.dataInfo.DLat

    let index, indexRow, windDV
    let minV = 50, maxV = 0
    for (let i = 0; i < this.dataInfo.LatNums; i++) {
      this.dataInfo.Wind[i] = []
      indexRow = i * this.dataInfo.LonNums
      for (let j = 0; j < this.dataInfo.LonNums; j++) {
        index = indexRow + j
        windDV = MathUtil.GetWindByUV(windData.data.uComp[index], windData.data.vComp[index])
        this.dataInfo.Wind[i].push(windDV)

        if (minV > windDV[1]) minV = windDV[1]
        if (maxV < windDV[1]) maxV = windDV[1]
      }
    }

    // TODO 数据归一化  注意：此处UV为图像坐标方向 V要取反
    let flagNan = false, flagZero = false, speedNormal = 0, delSpeed = maxV - minV, huDu = 0, huDuS = Math.PI / 180
    if (Math.abs(delSpeed) < DELTA_ZERO) { // 最大值和最小值相等
      flagNan = true
      if (Math.abs(minV) < DELTA_ZERO) { // 都为0值
        flagZero = true
      }
    }
    for (let i = 0; i < this.dataInfo.LatNums; i++) {
      this.dataInfo.UV[i] = []
      for (let j = 0; j < this.dataInfo.LonNums; j++) {
        huDu = this.dataInfo.Wind[i][j][0] * huDuS
        if (flagNan) {
          if (flagZero) {
            speedNormal = 0
          } else {
            speedNormal = 1
          }
        } else {
          speedNormal = (this.dataInfo.Wind[i][j][1] - minV) / delSpeed
        }
        this.dataInfo.UV[i].push([-speedNormal * Math.sin(huDu), speedNormal * Math.cos(huDu)])
      }
    }

    let px1 = this.lonLatToXY(this.dataInfo.LonMin, this.dataInfo.LatMin),
      px2 = this.lonLatToXY(this.dataInfo.LonMax, this.dataInfo.LatMax)

    this.boundInfo = {
      Width: Math.abs(px2[0] - px1[0]),
      Height: Math.abs(px2[1] - px1[1])
    }

    this.canvasNormal = document.createElement('canvas')
    this.canvasNormal.width = this.boundInfo.Width
    this.canvasNormal.height = this.boundInfo.Height
    this.ctx = this.canvasNormal.getContext('2d')
  }
```

---

```jsx
draw (type, step) {
    this.windType = type
    this.WIND_STEP = step
    let ctxNormal = this.ctx
    ctxNormal.clearRect(0, 0, this.boundInfo.Width, this.boundInfo.Height)
    // ctxNormal.fillStyle = '#FF0000'
    // ctxNormal.fillRect(0, 0, this.boundInfo.Width, this.boundInfo.Height)
    let color = LINE_COLOR, size = 24, lon, lat, angel, speed, xy, pt
    for (let i = 0; i < this.dataInfo.LatNums; i += this.WIND_STEP) {
      lat = this.dataInfo.LatMin + i * this.dataInfo.LatStep
      for (let j = 0; j < this.dataInfo.LonNums; j += this.WIND_STEP) {
        lon = this.dataInfo.LonMin + j * this.dataInfo.LonStep
        angel = this.dataInfo.Wind[i][j][0]
        speed = this.dataInfo.Wind[i][j][1]
        // speed = 30; // TODO 测试的 待删除
        xy = this.lonLatToCanvasXY(lon, lat, true)
        pt = new Point({x:xy[0],y: xy[1]})
        if (this.windType == windTypeEnum.FEATHER) {
          if (xy[0] > 0 && xy[0] < this.boundInfo.Width && xy[1] > 0 && xy[1] < this.boundInfo.Height) {
            this.drawWindShape(this.windType, ctxNormal, Math.floor(angel), Math.floor(speed), size, pt, color)
          }
        } else if (this.windType == windTypeEnum.ARROWS) {
          if (xy[0] > 0 && xy[0] < this.boundInfo.Width && xy[1] > 0 && xy[1] < this.boundInfo.Height) {
            this.drawWindShape(this.windType, ctxNormal, Math.floor(angel), Math.floor(speed), size, pt, color)
          }
        }
        // else if (this.windType == 3) {
        //     if (xy[0] > 0 && xy[0] < this.boundInfo.Width && xy[1] > 0 && xy[1] < this.boundInfo.Height) {
        //       this.drawWindShape(1, ctxNormal, Math.floor(angel), Math.floor(speed), size, pt, color)
        //       this.drawWindShape(2, ctxNormal, Math.floor(angel), Math.floor(speed), size, pt, color)
        //     }
        //   }
      }
    }

    return {
      pic: this.canvasNormal,
      range: [this.dataInfo.LonMin, this.dataInfo.LatMin, this.dataInfo.LonMax, this.dataInfo.LatMax]
    }

  }
```
