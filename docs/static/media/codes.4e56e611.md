```jsx
import Canvas from './canvas'
```

---

```jsx
new Canvas({
        Cartesian3ToPx:Cartesian3ToPx,
        viewer:viewer
      })
```

---

```jsx
new Canvas({
        Cartesian3ToPx:Cartesian3ToPx,
        viewer:viewer
      })
```

---

```jsx
new Canvas({
        Cartesian3ToPx:Cartesian3ToPx,
        viewer:viewer
      })
```

---

```jsx
  loadData () {
  }

```

---

```jsx
  draw () {}
```

---

```jsx
 lonLatToCanvasXY (lon, lat) {
    let px = {
      x: (lon - this.dataInfo.LonMin) * this.boundInfo.Width / (this.dataInfo.LonMax - this.dataInfo.LonMin),
      y: (this.dataInfo.LatMax - lat) * this.boundInfo.Height / (this.dataInfo.LatMax - this.dataInfo.LatMin),
    }

    return [px.x, px.y]
  }
```

---

```jsx
  lonLatToXY (lon, lat) {
    let px = this.Cartesian3ToPx(this.viewer.scene, Cesium.Cartesian3.fromDegrees(lon, lat, 0))
    return [px.x, px.y]
  }
```
