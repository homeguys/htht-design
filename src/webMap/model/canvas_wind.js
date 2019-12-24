import Cesium from 'cesium/Source/Cesium'
import { MathUtil } from '../utils/MathUtil'
import Point from '../entity/Point'
import { windTypeEnum } from '../enum/wind_type_enum'
import Canvas from './canvas'

const LINE_COLOR = 'rgba(255,0,0,1)'
const DELTA_ZERO = 0.0001

export default class CanvasWind extends Canvas {
  constructor ({Cartesian3ToPx, viewer}) {
    super({Cartesian3ToPx, viewer})
    this.WIND_STEP = 10 // 风场间隔
    this.windType = 1
  }

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

  /**
   * 绘制风符号 正北为0度 顺时针
   * @param windType 类型标识 1-风羽 2-箭头
   * @param ctx2d
   * @param dd 风向 度
   * @param ff 风速
   * @param size 风杆长度
   * @param xy 起点位置
   * @param color 颜色
   */
  drawWindShape (windType, ctx2d, dd, ff, size, xy, color) {

    if (!ctx2d || dd < 0 || ff <= 0 || size < 16) {
      return
    }

    if (windType < 1 || windType > 2) {
      windType = 1
    }

    // 风向转换成弧度
    dd = dd * Math.PI / 180.0
    if (ff == 1) {
      ff = 2
    }
    if (ff >= 50) {
      ff = 50
    }

    // 风向加上180度 比如正北风 方向应该从起点指向正下方 并控制下风速大小
    switch (windType) {
      case windTypeEnum.FEATHER:
        this.drawWindBarb(ctx2d, dd, ff, size, xy, color)
        break
      case windTypeEnum.ARROWS:
        dd += Math.PI
        this.drawWindArrow(ctx2d, dd, ff, size, xy, color)
        break
    }
  };

  drawWindBarb (ctx2d, dd, ff, size, xy, color) {

    ctx2d.strokeStyle = color

    let dw0 = size / 8.0
    let cosd = Math.cos(dd)
    let sind = Math.sin(dd)

    // 风杆
    let ptf1 = new Point({x:xy.X,y: xy.Y})
    let ptf2 = new Point({x:xy.X + 8 * dw0 * sind, y: xy.Y - 8 * dw0 * cosd})

    ctx2d.beginPath()
    ctx2d.moveTo(ptf1.X, ptf1.Y)
    ctx2d.lineTo(ptf2.X, ptf2.Y)
    ctx2d.stroke()
    ctx2d.closePath()

    // 风羽
    let n = 0, m = 0
    n = Math.floor(ff / 20)
    m = ff % 20

    let dpcha = dw0 * 2.0 * Math.tan(Math.PI / 3.0) // 20m/s 4m/s宽度
    let ptf3 =  new Point({x:0,y:0})

    // 20m/s风羽
    let i = 0
    let cnt1 = 8, cnt2 = 6, cnt20 = 0, cnt4 = 0
    for (i = 0; i < n; i++) {
      ptf1.X = xy.X + cnt1 * dw0 * sind
      ptf1.Y = xy.Y - cnt1 * dw0 * cosd

      ptf2.X = xy.X + cnt2 * dw0 * sind
      ptf2.Y = xy.Y - cnt2 * dw0 * cosd

      ptf3.X = ptf1.X + dpcha * cosd
      ptf3.Y = ptf1.Y + dpcha * sind

      ctx2d.beginPath()
      ctx2d.moveTo(ptf1.X, ptf1.Y)
      ctx2d.lineTo(ptf3.X, ptf3.Y)
      ctx2d.lineTo(ptf2.X, ptf2.Y)
      ctx2d.stroke()
      ctx2d.closePath()

      cnt1 -= 2
      cnt2 -= 2
      cnt20++
    }

    // 4m/s风羽
    if (cnt20 == 0) {
      cnt1 = 10
      cnt2 = 8
    } else {
      cnt1 += 1
      cnt2 += 1
    }
    n = Math.floor(m / 4)
    m = m % 4

    for (i = 0; i < n; i++) {
      ptf1.X = xy.X + cnt1 * dw0 * sind
      ptf1.Y = xy.Y - cnt1 * dw0 * cosd

      ptf2.X = xy.X + cnt2 * dw0 * sind
      ptf2.Y = xy.Y - cnt2 * dw0 * cosd

      ptf3.X = ptf1.X + dpcha * cosd
      ptf3.Y = ptf1.Y + dpcha * sind

      ctx2d.beginPath()
      ctx2d.moveTo(ptf2.X, ptf2.Y)
      ctx2d.lineTo(ptf3.X, ptf3.Y)
      ctx2d.stroke()
      ctx2d.closePath()

      cnt1--
      cnt2--
      cnt4++
    }

    if (cnt20 + cnt4 === 0) {
      cnt1 = 9
      cnt2 = 7
    }

    // 2m/s风羽
    n = Math.floor(m / 2)
    for (i = 0; i < n; i++) {
      ptf1.X = xy.X + cnt1 * dw0 * sind
      ptf1.Y = xy.Y - cnt1 * dw0 * cosd

      ptf2.X = xy.X + cnt2 * dw0 * sind
      ptf2.Y = xy.Y - cnt2 * dw0 * cosd

      ptf3.X = ptf1.X + dpcha * cosd
      ptf3.Y = ptf1.Y + dpcha * sind

      ptf3.X = (ptf2.X + ptf3.X) / 2.0
      ptf3.Y = (ptf2.Y + ptf3.Y) / 2.0

      ctx2d.beginPath()
      ctx2d.moveTo(ptf2.X, ptf2.Y)
      ctx2d.lineTo(ptf3.X, ptf3.Y)
      ctx2d.stroke()
      ctx2d.closePath()

      cnt1--
      cnt2--
    }
  };

  drawWindArrow (ctx2d, dd, ff, size, xy, color) {

    ctx2d.strokeStyle = color

    let dw0 = size / 8.0
    let dw = dw0
    let cosd = Math.cos(dd)
    let sind = Math.sin(dd)

    // 根据风杆长度进行风速分级
    if (ff >= 30) {
      dw = dw0 * 8.0
    } else if (ff >= 25 && ff < 30) {
      dw = dw0 * 7.0
    } else if (ff >= 20 && ff < 25) {
      dw = dw0 * 6.0
    } else if (ff >= 15 && ff < 20) {
      dw = dw0 * 5.0
    } else if (ff >= 10 && ff < 15) {
      dw = dw0 * 4.0
    } else if (ff >= 5 && ff < 10) {
      dw = dw0 * 3.0
    } else {
      dw = dw0 * 2.0
    }
    dw = size

    // 风杆
    let ptf1 = new Point({x:xy.X,y: xy.Y})
    let ptf2 = new Point({x:xy.X + dw * sind,y: xy.Y - dw * cosd})

    ctx2d.beginPath()
    ctx2d.moveTo(ptf1.X, ptf1.Y)
    ctx2d.lineTo(ptf2.X, ptf2.Y)
    ctx2d.stroke()
    ctx2d.closePath()

    // 箭头
    dw0 = dw0 * 2.0
    let dpcha = dw0 * Math.tan(Math.PI / 6.0)

    let ptf4 = new Point({x:ptf1.X + (dw - dw0) * sind, y:ptf1.Y - (dw - dw0) * cosd})

    ptf1.X = ptf2.X
    ptf1.Y = ptf2.Y

    ptf2.X = ptf4.X + dpcha * cosd
    ptf2.Y = ptf4.Y + dpcha * sind

    let ptf3 = new Point({x:ptf4.X - dpcha * cosd,y: ptf4.Y - dpcha * sind})

    ctx2d.beginPath()
    ctx2d.moveTo(ptf2.X, ptf2.Y)
    ctx2d.lineTo(ptf1.X, ptf1.Y)
    ctx2d.lineTo(ptf3.X, ptf3.Y)
    ctx2d.stroke()
    ctx2d.closePath()
  };

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

}
