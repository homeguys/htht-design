```jsx
import CanvasContour from './model/canvas_contour'
```

---

```jsx
new CanvasContour({ Cartesian3ToPx: this.Cartesian3ToPx, viewer: this })
```

---

```jsx
new CanvasContour({ Cartesian3ToPx: this.Cartesian3ToPx, viewer: this })
```

---

```jsx
new CanvasContour({ Cartesian3ToPx: this.Cartesian3ToPx, viewer: this })
```

---

```jsx
loadData (data) {
    this.dataInfo = {
      Item: data.Item,
      Values: data.Values,
      LonMin: data.Bound[0],
      LonMax: data.Bound[1],
      LatMin: data.Bound[2],
      LatMax: data.Bound[3],
      ContourList: data.Info,
    }

    let px1 = this.lonLatToXY(this.dataInfo.LonMin, this.dataInfo.LatMin)
    let px2 = this.lonLatToXY(this.dataInfo.LonMax, this.dataInfo.LatMax)

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
 draw () {
    let ctxNormal = this.ctx
    ctxNormal.clearRect(0, 0, this.boundInfo.Width, this.boundInfo.Height)
    ctxNormal.lineWidth = LINE_WIDTH
    ctxNormal.strokeStyle = LINE_COLOR

    let contourLines = this.dataInfo.ContourList

    let line, value, xy, index = 0, isFirst = true, labelPtX, labelPtY, Labels = []
    for (let i = 0; i < contourLines.length; i++) {
      value = contourLines[i].Value
      line = contourLines[i].Line
      index = Math.floor(line.length / 2)

      isFirst = true
      ctxNormal.beginPath()
      for (let j = 0; j < line.length; j++) {
        xy = this.lonLatToCanvasXY(line[j][0], line[j][1])
        if (isFirst) {
          ctxNormal.moveTo(xy[0], xy[1])
          isFirst = false
        } else {
          ctxNormal.lineTo(xy[0], xy[1])
        }
      }
      ctxNormal.stroke()
      ctxNormal.closePath()

      labelPtX = line[index][0]
      labelPtY = line[index][1]
      Labels.push({
        id: i,
        name: value + '',
        position: [labelPtY, labelPtX]
      })
    }

    return {
      pic: this.canvasNormal,
      range: [this.dataInfo.LonMin, this.dataInfo.LatMin, this.dataInfo.LonMax, this.dataInfo.LatMax],
      labels: Labels
    }
  }
```
