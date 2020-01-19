```jsx
import Windy from './model/windy'
```

---

```jsx
new Windy({cesiumPrimitives:this.scene.primitives})
```

---

```jsx
new Windy({cesiumPrimitives:this.scene.primitives})
```

---

```jsx
changeShow (isShow) {
    this.isShow = isShow
  };
```

---

```jsx
loadData (windData) {

    this.isLoadData = false
    this.isInitWindy = false
    this.dataInfo.ParticleBuf = []
    this.removeLines()

    function getUVSpeed (u, v) {
      return [u, v, Math.sqrt(u * u + v * v)]
    }

     let that = this

    that.dataInfo.UV = []
    that.dataInfo.LonMin = windData.header.lo1
    that.dataInfo.LatMin = windData.header.la1
    that.dataInfo.LonNums = windData.header.nx
    that.dataInfo.LatNums = windData.header.ny
    that.dataInfo.LonStep = windData.header.dx
    that.dataInfo.LatStep = windData.header.dy
    that.dataInfo.DLon = (windData.header.nx - 1) * windData.header.dx
    that.dataInfo.DLat = (windData.header.ny - 1) * windData.header.dy
    that.dataInfo.LonMax = windData.header.lo1 + that.dataInfo.DLon
    that.dataInfo.LatMax = windData.header.la1 + that.dataInfo.DLat

     let index, indexRow,
      uComp = windData.data.uComp,
      vComp = windData.data.vComp
    for ( let i = 0; i < that.dataInfo.LatNums; i++) {
      that.dataInfo.UV[i] = []
      indexRow = i * that.dataInfo.LonNums
      for ( let j = 0; j < that.dataInfo.LonNums; j++) {
        index = indexRow + j
        that.dataInfo.UV[i].push(getUVSpeed(uComp[index], vComp[index]))
      }
    }

    that.isLoadData = true

  };
```

---

```jsx
startWindy () {

    this.stopWindy()
    if (!this.isLoadData || !this.isInitWindy) {
      return
    }

     let that = this

    function getLineInstance (lineColor, ptXYArray) {
       let colors = [],
        pts = [],
        length = ptXYArray.length,
        count = length / 2,
        index1 = 0,
        index2 = 0

      for ( let i = 0; i < count; i++) {
        index1 = 2 * i
        index2 = index1 + 1
        colors.push(lineColor.withAlpha(index1 * 1.0 / length),
          lineColor.withAlpha(index2 * 1.0 / length))
        pts.push(that.dataInfo.LonMin + ptXYArray[index1] * that.dataInfo.LonStep,
          that.dataInfo.LatMin + ptXYArray[index2] * that.dataInfo.LatStep)
      }

      return new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineGeometry({
          positions: Cesium.Cartesian3.fromDegreesArray(pts),
          colors: colors,
          width: 1.0,
          colorsPerVertex: true
        })
      })
    }

    function animate () {

       let x, y, uv, xt, yt, particleObj, lineInstances = []
       let particleBuf = that.dataInfo.ParticleBuf
      particleBuf.forEach(function (particle) {
        if (particle.Age >= particle.AgeMax) {
          particleObj = that.getParticle()
          if (particleObj != null) {
            particle.X = particleObj.X
            particle.Y = particleObj.Y
            particle.Color = particleObj.Color
            particle.AgeMax = particleObj.AgeMax
            particle.Age = 0
            particle.Path = []
          }
        }
        x = particle.X
        y = particle.Y
        if (y < 0 || y >= that.dataInfo.LatNums
          || x < 0 || x >= that.dataInfo.LonNums) {
          particle.Age = particle.AgeMax
        } else {
          uv = that.interBilinear(x, y)
          if (uv != null) {
            xt = x + uv[0] * that.speedScale
            yt = y + uv[1] * that.speedScale
            particle.Path.push(xt, yt)
            particle.X = xt
            particle.Y = yt
            if (particle.Path.length >= 4) {
              lineInstances.push(getLineInstance(particle.Color, particle.Path))
            }
          }
          particle.Age++
        }
      })

      that.removeLines()
      if (lineInstances.length > 0) {
        that.lines = that.primitives.add(new Cesium.Primitive({
          appearance: new Cesium.PolylineColorAppearance({
            translucent: true
          }),
          geometryInstances: lineInstances,
          asynchronous: false,
          show: that.isShow
        }))
      }
    }

    this.playTimer = setInterval(function () {
      animate()
    }, FRAME_TIME)
  };
```

---

```jsx
stopWindy () {

    this.play = false
    if (this.playTimer != null) {
      clearInterval(this.playTimer)
    }
  };
```
