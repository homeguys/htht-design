```jsx
import GroundDraw from './model/GroundDraw'
```

---

```jsx
new GroundDraw()
```

---

```jsx
drawGroundAll = function (staInfo, ctx2d, ctxColorText = 'white', coe = 1) {

    if (!staInfo || !staInfo.dataInfo || !ctx2d) {
      return
    }

    // 排列方式
    // DT24  CH      DP24
    // AT   CM      OP
    // WW   N       P3
    // VV   CL/NH  WG1/WG2
    // TD   H       R6

    //24小时变温   高云状        24小时变压
    //温度         中云状        海平面气压
    //现在天气     总云量        3小时变压
    //有效能见度   低云状/低云量  过去天气1/过去天气2
    //露点温度     低云高        6小时降水

    let dataInfo = objDeepCopy(staInfo.dataInfo)

    //无效数据不绘制
    if (dataInfo.InvalidType) {
      for (let i in dataInfo.InvalidType) {
        dataInfo[dataInfo.InvalidType[i]] = dataInfo.INVALID_VALUE
      }

    }

    let width = ctx2d.canvas.width, height = ctx2d.canvas.height//canvas宽高
    let scale = 0.3//绘图类缩放系数
    let x = 0, y = -7//基础XY y为字体的一半
    let xStep = width / 6
    let yStep = height / 10

    let colorText = ctxColorText, font = '14px sans-serif'
    ctx2d.lineWidth = 1.5
    ctx2d.strokeStyle = 'white'
    ctx2d.fillStyle = 'white'

    // 第一列
    // 24小时变温
    if (dataInfo.DT24 != dataInfo.INVALID_VALUE) {
      let dt24 = dataInfo.DT24 / coe
      if (dt24 < 0) {
        dt24 = Math.abs(dt24) + 50
      }
      this.drawText(ctx2d, dt24, colorText, font, myPoint(x+1*xStep, y+1*yStep), width, true)
    }
    //  温度
    if (dataInfo.AT != dataInfo.INVALID_VALUE) {
      // let AT = Math.round(dataInfo.AT / coe * 10) / 10;
      let AT = Math.round(dataInfo.AT / coe)
      this.drawText(ctx2d, AT, colorText, font, myPoint(x+1*xStep, y+3*yStep), width, true)
    }
    // 现在天气
    if (dataInfo.WW != dataInfo.INVALID_VALUE) {
      let WW = Math.floor(dataInfo.WW / coe)
      this.drawWeathShape(ctx2d, 1, WW, myPoint(x+0.5*xStep, y+4.5*yStep), scale)
    }
    // 有效能见度
    if (dataInfo.VV != dataInfo.INVALID_VALUE) {
      let vv = Math.floor(dataInfo.VV / coe)
      if (vv === 0) {
        vv = '<0.1'
      } else if (vv > 0 && vv <= 50) {
        vv = vv / 10
      } else if (vv >= 56 && vv <= 80) {
        vv = vv - 50
      } else if (vv >= 81 && vv <= 88) {
        vv = (vv - 80) * 5 + 30
      } else if (vv >= 89 && vv <= 98) {
        switch (vv) {
          case 89:
            vv = '>70'
            break
          case 90:
            vv = '<0.05'
            break
          case 91:
            vv = 0.05
            break
          case 92:
            vv = 0.2
            break
          case 93:
            vv = 0.5
            break
          case 94:
            vv = 1
            break
          case 95:
            vv = 2
            break
          case 96:
            vv = 4
            break
          case 97:
            vv = 10
            break
          case 98:
            vv = 20
            break
        }
      } else if (vv >= 99) {
        vv = '>=50'
      } else {
        vv = 'X'
      }
      this.drawText(ctx2d, vv, colorText, font, myPoint(x+1*xStep, y+7*yStep), width, true)
    }
    //  露点温度
    if (dataInfo.TD != dataInfo.INVALID_VALUE) {
      // let TD = Math.round(dataInfo.TD / coe * 10) / 10;
      let TD = Math.round(dataInfo.TD / coe)
      this.drawText(ctx2d, TD, colorText, font, myPoint(x+1*xStep, y+9*yStep), width, true)
    }

    // 第二列
    // 高云状
    if (dataInfo.CH != dataInfo.INVALID_VALUE) {
      let CH = Math.floor(dataInfo.CH / coe)
      this.drawChShape(ctx2d, CH, myPoint(x+2.5*xStep, y+0.5*yStep), scale)
    }
    // 中云状
    if (dataInfo.CM != dataInfo.INVALID_VALUE) {
      let CM = Math.floor(dataInfo.CM / coe)
      this.drawCmShape(ctx2d, CM, myPoint(x+2.5*xStep, y+2.5*yStep), scale)
    }
    // 总云量
    if (dataInfo.N != dataInfo.INVALID_VALUE) {
      let n = Math.floor(dataInfo.N / coe)
      switch (n) {
        case 0:
          n = 0
          break
        case 1:
          n = 1
          break
        case 2:
          n = 2
          break
        case 3:
        case 4:
        case 5:
        case 6:
          n = n + 1
          break
        case 7:
        case 8:
          n = n + 2
          break
      }
      this.drawCloudAmount(ctx2d, n, myPoint(x+2.5*xStep, y+4.5*yStep), scale*30)
    }
    // 低云状
    if (dataInfo.CL != dataInfo.INVALID_VALUE) {
      let CL = Math.floor(dataInfo.CL / coe)
      this.drawClShape(ctx2d, CL, myPoint(x+2.5*xStep, y+6.5*yStep), scale/2 )
    }
    // 低云量
    if (dataInfo.NH != dataInfo.INVALID_VALUE) {
      let NH = Math.floor(dataInfo.NH / coe)
      this.drawCloudAmount(ctx2d, NH, myPoint(x+2.5*xStep, y+6.5*yStep), scale*15)
    }
    // 低云高
    if (dataInfo.H != dataInfo.INVALID_VALUE) {
      let h = Math.floor(dataInfo.H / coe)
      switch (h) {
        case 0:
          h = '<50'
          break
        case 1:
          h = 50
          break
        case 2:
          h = 100
          break
        case 3:
          h = 200
          break
        case 4:
          h = 300
          break
        case 5:
          h = 600
          break
        case 6:
          h = 1000
          break
        case 7:
          h = 1500
          break
        case 8:
          h = 2000
          break
        case 9:
          h = 2500
          break
        default:
          h = 'X'
          break
      }
      this.drawText(ctx2d, h, colorText, font, myPoint(x+3*xStep, y+9*yStep), width)
    }

    // 第三列
    // 24小时变压
    if (dataInfo.DP24 != dataInfo.INVALID_VALUE) {
      let dp24 = dataInfo.DP24 / coe
      if (dp24 < 0) {
        dp24 = Math.abs(dp24) + 50
      }
      this.drawText(ctx2d, dp24, colorText, font, myPoint(x+5*xStep, y+1*yStep), width)
    }
    //  海平面气压
    if (dataInfo.OP != dataInfo.INVALID_VALUE) {
      let OP = Math.floor(dataInfo.OP / coe)
      if (OP >= 1000) {
        OP = Math.round((OP - 1000) * 10)
      } else {
        OP = Math.round((OP - 900) * 10)
      }
      this.drawText(ctx2d, OP, colorText, '10px sans-serif', myPoint(x+5*xStep, y+3*yStep), width)
    }
    // 3小时变压
    if (dataInfo.P3 != dataInfo.INVALID_VALUE) {
      let p3 = (dataInfo.P3 / coe).toFixed(1)
      if (p3 > 0) {
        if ((p3 * 10) < 10) {
          p3 = '+0' + (p3 * 10)
        } else {
          p3 = '+' + (p3 * 10)
        }
      } else {
        if ((p3 * 10) > -10) {
          p3 = '-0' + (-p3 * 10)
        } else {
          p3 = '-' + (-p3 * 10)
        }
      }

      this.drawText(ctx2d, p3, colorText, font, myPoint(x+5*xStep, y+5*yStep), width)
    }

    // 过去天气1
    if (dataInfo.WG1 != dataInfo.INVALID_VALUE) {
      let WG1 = Math.floor(dataInfo.WG1 / coe)
      this.drawWeathShape(ctx2d, -1, WG1, myPoint(x+5*xStep, y+6.5*yStep), scale / 2)
    }
    // 过去天气2
    if (dataInfo.WG2 != dataInfo.INVALID_VALUE) {
      let WG2 = Math.floor(dataInfo.WG2 / coe)
      this.drawWeathShape(ctx2d, -1, WG2, myPoint(x+4.5*xStep, y+6.5*yStep), scale / 2)
    }
    //  6小时降水
    if (dataInfo.R6 != dataInfo.INVALID_VALUE) {
      let r6 = dataInfo.R6 / coe
      if (r6 > 0 && r6 <= 0.1) {
        r6 = 'T'
      } else if (r6 > 0.1 && r6 < 1) {
        r6 = r6.toFixed(1)
      } else if (r6 >= 1) {
        r6 = Math.round(r6)
      } else {
        r6 = 0
      }
      this.drawText(ctx2d, r6, colorText, font, myPoint(x+5*xStep, y+9*yStep), width)
    }

    //  风符号
    if (dataInfo.WD != dataInfo.INVALID_VALUE && dataInfo.WS != dataInfo.INVALID_VALUE) {
      let WD = Math.floor(dataInfo.WD / coe)
      if (WD < 0) {
        WD = 0
      }
      if (WD > 360) {
        WD = WD % 360
      }

      let WS = Math.floor(dataInfo.WS / coe)
      this.drawWindShape(1, ctx2d, WD, WS, width  /3 , myPoint(x+3*xStep, y+5.5*yStep), 'black')
    }
  }

```

---

```jsx
drawGroundJD = function (staInfo, ctx2d, ctxColorText = 'white', coe = 1) {

    if (!staInfo || !staInfo.dataInfo || !ctx2d) {
      return
    }

    // 排列方式
    // DT24  CH      DP24
    // AT   CM      OP
    // WW   N       P3
    // VV   CL/NH  WG1/WG2
    // TD   H       R6

    //24小时变温   高云状        24小时变压
    //温度         中云状        海平面气压
    //现在天气     总云量        3小时变压
    //有效能见度   低云状/低云量  过去天气1/过去天气2
    //露点温度     低云高        6小时降水

    let dataInfo = objDeepCopy(staInfo.dataInfo)

    //无效数据不绘制
    if (dataInfo.InvalidType) {
      for (let i in dataInfo.InvalidType) {
        dataInfo[dataInfo.InvalidType[i]] = dataInfo.INVALID_VALUE
      }

    }

    let width = ctx2d.canvas.width, height = ctx2d.canvas.height//canvas宽高
    let scale = 0.3//绘图类缩放系数
    let x = 0, y = -7//基础XY y为字体的一半
    let xStep = width / 6
    let yStep = height / 10

    let colorText = ctxColorText, font = '14px sans-serif'
    ctx2d.lineWidth = 1.5
    ctx2d.strokeStyle = 'white'
    ctx2d.fillStyle = 'white'

    // 第一列
    // 24小时变温
    if (dataInfo.DT24 != dataInfo.INVALID_VALUE) {
      let dt24 = dataInfo.DT24 / coe
      if (dt24 < 0) {
        dt24 = Math.abs(dt24) + 50
      }
      this.drawText(ctx2d, dt24, colorText, font, myPoint(x+1*xStep, y+1*yStep), width, true)
    }
    //  温度
    if (dataInfo.AT != dataInfo.INVALID_VALUE) {
      // let AT = Math.round(dataInfo.AT / coe * 10) / 10;
      let AT = Math.round(dataInfo.AT / coe)
      this.drawText(ctx2d, AT, colorText, font, myPoint(x+1*xStep, y+3*yStep), width, true)
    }
    // 现在天气
    if (dataInfo.WW != dataInfo.INVALID_VALUE) {
      let WW = Math.floor(dataInfo.WW / coe)
      this.drawWeathShape(ctx2d, 1, WW, myPoint(x+0.5*xStep, y+4.5*yStep), scale)
    }
    // 有效能见度
    if (dataInfo.VV != dataInfo.INVALID_VALUE) {
      let vv = Math.floor(dataInfo.VV / coe)
      if (vv === 0) {
        vv = '<0.1'
      } else if (vv > 0 && vv <= 50) {
        vv = vv / 10
      } else if (vv >= 56 && vv <= 80) {
        vv = vv - 50
      } else if (vv >= 81 && vv <= 88) {
        vv = (vv - 80) * 5 + 30
      } else if (vv >= 89 && vv <= 98) {
        switch (vv) {
          case 89:
            vv = '>70'
            break
          case 90:
            vv = '<0.05'
            break
          case 91:
            vv = 0.05
            break
          case 92:
            vv = 0.2
            break
          case 93:
            vv = 0.5
            break
          case 94:
            vv = 1
            break
          case 95:
            vv = 2
            break
          case 96:
            vv = 4
            break
          case 97:
            vv = 10
            break
          case 98:
            vv = 20
            break
        }
      } else if (vv >= 99) {
        vv = '>=50'
      } else {
        vv = 'X'
      }
      this.drawText(ctx2d, vv, colorText, font, myPoint(x+1*xStep, y+7*yStep), width, true)
    }
    //  露点温度
    if (dataInfo.TD != dataInfo.INVALID_VALUE) {
      // let TD = Math.round(dataInfo.TD / coe * 10) / 10;
      let TD = Math.round(dataInfo.TD / coe)
      this.drawText(ctx2d, TD, colorText, font, myPoint(x+1*xStep, y+9*yStep), width, true)
    }

    // 第二列
    // 高云状
    if (dataInfo.CH != dataInfo.INVALID_VALUE) {
      let CH = Math.floor(dataInfo.CH / coe)
      this.drawChShape(ctx2d, CH, myPoint(x+2.5*xStep, y+0.5*yStep), scale)
    }
    // 中云状
    if (dataInfo.CM != dataInfo.INVALID_VALUE) {
      let CM = Math.floor(dataInfo.CM / coe)
      this.drawCmShape(ctx2d, CM, myPoint(x+2.5*xStep, y+2.5*yStep), scale)
    }
    // 总云量
    if (dataInfo.N != dataInfo.INVALID_VALUE) {
      let n = Math.floor(dataInfo.N / coe)
      switch (n) {
        case 0:
          n = 0
          break
        case 1:
          n = 1
          break
        case 2:
          n = 2
          break
        case 3:
        case 4:
        case 5:
        case 6:
          n = n + 1
          break
        case 7:
        case 8:
          n = n + 2
          break
      }
      this.drawCloudAmount(ctx2d, n, myPoint(x+2.5*xStep, y+4.5*yStep), scale*30)
    }
    // 低云状
    if (dataInfo.CL != dataInfo.INVALID_VALUE) {
      let CL = Math.floor(dataInfo.CL / coe)
      this.drawClShape(ctx2d, CL, myPoint(x+2.5*xStep, y+6.5*yStep), scale/2 )
    }
    // 低云量
    if (dataInfo.NH != dataInfo.INVALID_VALUE) {
      let NH = Math.floor(dataInfo.NH / coe)
      this.drawCloudAmount(ctx2d, NH, myPoint(x+2.5*xStep, y+6.5*yStep), scale*15)
    }
    // 低云高
    if (dataInfo.H != dataInfo.INVALID_VALUE) {
      let h = Math.floor(dataInfo.H / coe)
      switch (h) {
        case 0:
          h = '<50'
          break
        case 1:
          h = 50
          break
        case 2:
          h = 100
          break
        case 3:
          h = 200
          break
        case 4:
          h = 300
          break
        case 5:
          h = 600
          break
        case 6:
          h = 1000
          break
        case 7:
          h = 1500
          break
        case 8:
          h = 2000
          break
        case 9:
          h = 2500
          break
        default:
          h = 'X'
          break
      }
      this.drawText(ctx2d, h, colorText, font, myPoint(x+3*xStep, y+9*yStep), width)
    }

    // 第三列
    // 24小时变压
    if (dataInfo.DP24 != dataInfo.INVALID_VALUE) {
      let dp24 = dataInfo.DP24 / coe
      if (dp24 < 0) {
        dp24 = Math.abs(dp24) + 50
      }
      this.drawText(ctx2d, dp24, colorText, font, myPoint(x+5*xStep, y+1*yStep), width)
    }
    //  海平面气压
    if (dataInfo.OP != dataInfo.INVALID_VALUE) {
      let OP = Math.floor(dataInfo.OP / coe)
      if (OP >= 1000) {
        OP = Math.round((OP - 1000) * 10)
      } else {
        OP = Math.round((OP - 900) * 10)
      }
      this.drawText(ctx2d, OP, colorText, '10px sans-serif', myPoint(x+5*xStep, y+3*yStep), width)
    }
    // 3小时变压
    if (dataInfo.P3 != dataInfo.INVALID_VALUE) {
      let p3 = (dataInfo.P3 / coe).toFixed(1)
      if (p3 > 0) {
        if ((p3 * 10) < 10) {
          p3 = '+0' + (p3 * 10)
        } else {
          p3 = '+' + (p3 * 10)
        }
      } else {
        if ((p3 * 10) > -10) {
          p3 = '-0' + (-p3 * 10)
        } else {
          p3 = '-' + (-p3 * 10)
        }
      }

      this.drawText(ctx2d, p3, colorText, font, myPoint(x+5*xStep, y+5*yStep), width)
    }

    // 过去天气1
    if (dataInfo.WG1 != dataInfo.INVALID_VALUE) {
      let WG1 = Math.floor(dataInfo.WG1 / coe)
      this.drawWeathShape(ctx2d, -1, WG1, myPoint(x+5*xStep, y+6.5*yStep), scale / 2)
    }
    // 过去天气2
    if (dataInfo.WG2 != dataInfo.INVALID_VALUE) {
      let WG2 = Math.floor(dataInfo.WG2 / coe)
      this.drawWeathShape(ctx2d, -1, WG2, myPoint(x+4.5*xStep, y+6.5*yStep), scale / 2)
    }
    //  6小时降水
    if (dataInfo.R6 != dataInfo.INVALID_VALUE) {
      let r6 = dataInfo.R6 / coe
      if (r6 > 0 && r6 <= 0.1) {
        r6 = 'T'
      } else if (r6 > 0.1 && r6 < 1) {
        r6 = r6.toFixed(1)
      } else if (r6 >= 1) {
        r6 = Math.round(r6)
      } else {
        r6 = 0
      }
      this.drawText(ctx2d, r6, colorText, font, myPoint(x+5*xStep, y+9*yStep), width)
    }

    //  风符号
    if (dataInfo.WD != dataInfo.INVALID_VALUE && dataInfo.WS != dataInfo.INVALID_VALUE) {
      let WD = Math.floor(dataInfo.WD / coe)
      if (WD < 0) {
        WD = 0
      }
      if (WD > 360) {
        WD = WD % 360
      }

      let WS = Math.floor(dataInfo.WS / coe)
      this.drawWindShape(1, ctx2d, WD, WS, width  /3 , myPoint(x+3*xStep, y+5.5*yStep), 'black')
    }
  }

```

---

```jsx
 drawHigh = function (staInfo, ctx2d, ctxColorText = 'white', coe = 1) {

    if (!staInfo || !staInfo.dataInfo || !ctx2d) {
      return
    }

    // 排列方式
    // AT       PS
    //
    // TD
    // 风符号起点中心处

    //温度      气压
    //
    //露点温度差

    let dataInfo = objDeepCopy(staInfo.dataInfo)

    //无效数据不绘制
    if (dataInfo.InvalidType) {
      for (let i in dataInfo.InvalidType) {
        dataInfo[dataInfo.InvalidType[i]] = dataInfo.INVALID_VALUE
      }

    }

    let width = ctx2d.canvas.width, height = ctx2d.canvas.height//canvas宽高
    let scale = 0.3//绘图类缩放系数
    let x = 0, y = -7//基础XY y为字体的一半
    let xStep = width / 6
    let yStep = height / 10

    let colorText = ctxColorText, font = '14px sans-serif'
    ctx2d.lineWidth = 1.5
    ctx2d.strokeStyle = 'white'
    ctx2d.fillStyle = 'white'

    // 第一列
    //  温度
    if (dataInfo.AT != dataInfo.INVALID_VALUE) {
      let AT = Math.round(dataInfo.AT / coe)
      this.drawText(ctx2d, AT, colorText, font, myPoint(x+1*xStep, y+1*yStep), width, true)
    }

    //  露点温度
    if (dataInfo.TD != dataInfo.INVALID_VALUE) {
      let TD = Math.round(dataInfo.TD / coe)
      this.drawText(ctx2d, TD, colorText, font, myPoint(x+1*xStep, y+9*yStep), width, true)
    }


    // 第三列
    // 气压
    if (dataInfo.PS != dataInfo.INVALID_VALUE) {
      let PS = Math.round(dataInfo.PS / coe)
      this.drawText(ctx2d, PS, colorText, font, myPoint(x+5*xStep, y+1*yStep), width)
    }


    //  风符号
    if (dataInfo.WD != dataInfo.INVALID_VALUE && dataInfo.WS != dataInfo.INVALID_VALUE) {
      let WD = Math.floor(dataInfo.WD / coe)
      if (WD < 0) {
        WD = 0
      }
      if (WD > 360) {
        WD = WD % 360
      }

      let WS = Math.floor(dataInfo.WS / coe)
      this.drawWindShape(1, ctx2d, WD, WS, width  /3 , myPoint(x+3*xStep, y+5.5*yStep), 'black')
    }
  }

```
