/**
 * 地面填图
 */


let WSclor = 'black'//white
let Nclor = 'black'//white
let CLclor = 'black'//white

//为了不引入Point.js，使用myPoint 替换了所有的new Point
function myPoint (x, y) {
  let result = {
    X: x,
    Y: y
  }
  return result
}

//深拷贝
function objDeepCopy (source) {
  let sourceCopy = {}
  for (let item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  return sourceCopy
}

export default class GroundDraw {
  constructor () {
  }

  /**
   * 地面全要素填图
   * @param staInfo 站点信息
   * @param ctx2d canvas的2d画布
   * @param ctxColorText 文字颜色
   * @param coe 数据缩放系数
   */
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

  /**
   * 地面JD素填图
   * @param staInfo 站点信息
   * @param ctx2d canvas的2d画布
   * @param ctxColorText 文字颜色
   * @param coe 数据缩放系数
   */
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

  /**
   * 高空站格式填图
   * @param staInfo 站点信息
   * @param ctx2d canvas的2d画布
   */
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




  /**
   * 浮标格式填图
   * @param staInfo 站点信息
   * @param ctx2d canvas的2d画布
   */
  drawGroundFB = function (staInfo, ctx2d, ctxColorText = 'white', coe = 1) {
    if (!staInfo || !staInfo.dataInfo || !ctx2d) {
      return
    }

    // 排列方式
    //SST           V22062
    //      SD/SS
    //V22381        V22073

    // 海表温度                         海水盐度
    //               表层海洋面风羽
    //  平均波高                        最大波高

    // let color = "rgba(0, 0, 0, 0.5)";
    // ctx2d.strokeStyle = color;
    // ctx2d.fillStyle = color;
    // ctx2d.beginPath();
    // ctx2d.moveTo(0, 0);
    // ctx2d.lineTo(100, 0);
    // ctx2d.lineTo(100, 100);
    // ctx2d.lineTo(0, 100);
    // ctx2d.lineTo(0, 0);
    // ctx2d.fill();
    // ctx2d.closePath();
    // ctx2d.beginPath();
    // ctx2d.moveTo(50, 0);
    // ctx2d.lineTo(50, 100);
    // ctx2d.moveTo(0, 50);
    // ctx2d.lineTo(100, 50);
    // ctx2d.strokeStyle = "red";
    // ctx2d.stroke();
    // ctx2d.closePath();

    let dataInfo = objDeepCopy(staInfo.dataInfo)
//无效数据不绘制
    if (dataInfo.InvalidType) {
      for (let j = 0; j < dataInfo.InvalidType.length; j++) {
        dataInfo[dataInfo.InvalidType[j]] = dataInfo.INVALID_VALUE
      }
    }

    let width = 38, height = 16, scale = 0.3, ht = scale * 60
    let x = 1, y = 1, xp = 2, yp = 2,
      ly = y + (ht - height) / 2, lyp = yp + (ht - height)
    let color = 'black', colorText = ctxColorText, font = 'bold 15px sans-serif'
    ctx2d.lineWidth = 1.5
    ctx2d.strokeStyle = 'white'
    ctx2d.fillStyle = 'white'

    this.drawCloudAmount(ctx2d, 9, myPoint(x + width + xp + ht / 2 - 9, y + 1.5 * (ht + yp) + ht / 2 - 9), ht / 2)
    //  浮标移动方向及速度符号
    if (dataInfo.SD != dataInfo.INVALID_VALUE && dataInfo.SS != dataInfo.INVALID_VALUE) {
      let SD = Math.floor(dataInfo.SD / coe)
      if (SD < 0) {
        SD = 0
      }
      if (SD > 360) {
        SD = SD % 360
      }

      let SS = Math.floor(dataInfo.SS / coe)
      this.drawWindShape(1, ctx2d, SD, SS, ht / 2 + width, myPoint(x + width + xp + ht / 2, y + 1.5 * (ht + yp) + ht / 2), 'black')
    }

    // 第一列
    let x0 = x + width / 2
    //  海表温度
    if (dataInfo.SST != dataInfo.INVALID_VALUE) {
      // let SST = dataInfo.SST / coe;
      let SST = Math.round(dataInfo.SST / coe)
      this.drawText(ctx2d, SST, colorText, font, myPoint(x0, ly), width, true)
    }
    //  平均波高
    if (dataInfo.V22381 != dataInfo.INVALID_VALUE) {
      let V22381 = dataInfo.V22381 / coe
      this.drawText(ctx2d, V22381, colorText, font, myPoint(x0, ly + 3 * (height + lyp)), width, true)
    }

    // 第三列
    x0 = x + width + xp + ht + xp + width / 2
    // 海水盐度
    if (dataInfo.V22062 != dataInfo.INVALID_VALUE) {
      let V22062 = dataInfo.V22062 / coe
      this.drawText(ctx2d, V22062, colorText, font, myPoint(x0, ly), width)
    }
    // 最大波高
    if (dataInfo.V22073 != dataInfo.INVALID_VALUE) {
      let V22073 = dataInfo.V22073 / coe
      this.drawText(ctx2d, V22073, colorText, font, myPoint(x0, ly + 3 * (height + lyp)), width)
    }
  }

  /**
   * 绘制文本 上对齐
   * @param ctx2d
   * @param info 文本内容
   * @param color 颜色
   * @param font 字体
   * @param xy 起始位置
   * @param width 文本最大宽度 15px sans-serif 6个字符宽度是45
   */
  drawText = function (ctx2d, info, color, font, xy, width) {
    if (!ctx2d || !info || info.length === 0) {
      return
    }

    if (!font || font.length === 0) {
      font = '15px sans-serif'
    }
    if (!color || color.length === 0) {
      color = 'black'
    }
    ctx2d.textBaseline = 'top'
    // if(isRight){
    //     ctx2d.textAlign="right";
    // }else {
    //     ctx2d.textAlign="left";
    // }
    ctx2d.textAlign = 'center'
    ctx2d.font = font
    ctx2d.fillStyle = color
    ctx2d.fillText(info, xy.X, xy.Y, width)
  }

  /**
   * 绘制总云量符号类
   * @param ctx2d
   * @param amount 总运量数值
   * @param xy 符号左上角位置
   * @param size 符号半径
   */
  drawCloudAmount = function (ctx2d, amount, xy, size) {

    ctx2d.strokeStyle = Nclor
    ctx2d.fillStyle = Nclor

    let ptLeftTop = myPoint(xy.X, xy.Y)
    // 圆心、半径
    xy.X = xy.X + size
    xy.Y = xy.Y + size
    let d = size - size / 8.0

    // 画站圈
    ctx2d.beginPath()
    ctx2d.arc(xy.X, xy.Y, d, 0, Math.PI * 2)
    ctx2d.stroke()
    ctx2d.closePath()

    // 上、下、左、右四点坐标
    let ptf1 = myPoint(xy.X, xy.Y - d)
    let ptf2 = myPoint(xy.X, xy.Y + d)
    let ptf3 = myPoint(xy.X - d, xy.Y)
    let ptf4 = myPoint(xy.X + d, xy.Y)

    ctx2d.beginPath()
    switch (amount) {
      case 0:
        break
      case 1:
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf2.X, ptf2.Y)
        ctx2d.stroke()
        break
      case 2:
        ctx2d.moveTo(xy.X, xy.Y)
        ctx2d.arc(xy.X, xy.Y, d, 0, -Math.PI / 2, true)
        ctx2d.fill()
        break
      case 3:
        ctx2d.moveTo(xy.X, xy.Y)
        ctx2d.arc(xy.X, xy.Y, d, 0, -Math.PI / 2, true)
        ctx2d.fill()
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf2.X, ptf2.Y)
        ctx2d.stroke()
        break
      case 4:
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.arc(xy.X, xy.Y, d, -Math.PI / 2, Math.PI / 2)
        ctx2d.fill()
        break
      case 5:
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.arc(xy.X, xy.Y, d, -Math.PI / 2, Math.PI / 2)
        ctx2d.fill()
        ctx2d.moveTo(xy.X, xy.Y)
        ctx2d.lineTo(ptf3.X, ptf3.Y)
        ctx2d.stroke()
        break
      case 6:
        ctx2d.moveTo(xy.X, xy.Y)
        ctx2d.arc(xy.X, xy.Y, d, -Math.PI / 2, Math.PI)
        ctx2d.fill()
        break
      case 7:
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.arc(xy.X, xy.Y, d, 0, Math.PI * 2)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf2.X, ptf2.Y)
        ctx2d.strokeStyle = 'black'
        ctx2d.stroke()
        break
      case 8:
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.arc(xy.X, xy.Y, d, 0, Math.PI * 2)
        ctx2d.fill()
        break
      default: //不明
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        let cosd = d * Math.cos(45 * Math.PI / 180)
        let sind = d * Math.sin(45 * Math.PI / 180)
        ptf1.X = xy.X - cosd
        ptf1.Y = xy.Y - sind
        ptf2.X = xy.X + cosd
        ptf2.Y = xy.Y + sind
        ptf3.X = xy.X + cosd
        ptf3.Y = xy.Y - sind
        ptf4.X = xy.X - cosd
        ptf4.Y = xy.Y + sind
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf2.X, ptf2.Y)
        ctx2d.moveTo(ptf3.X, ptf3.Y)
        ctx2d.lineTo(ptf4.X, ptf4.Y)
        ctx2d.stroke()
        break
    }
    ctx2d.closePath()
  }

  /**
   * 绘制总云量符号类JD标准
   * @param ctx2d
   * @param amount 总运量数值
   * @param xy 符号左上角位置
   * @param size 符号半径
   * @param isWind 静风标识
   */
  drawCloudAmountJD = function (ctx2d, amount, xy, size, isWind) {

    ctx2d.strokeStyle = 'white'
    ctx2d.fillStyle = 'black'

    let ptLeftTop = myPoint(xy.X, xy.Y)
    // 圆心、半径
    xy.X = xy.X + size
    xy.Y = xy.Y + size
    let d = size - size / 8.0

    // 画站圈
    ctx2d.beginPath()
    ctx2d.arc(xy.X, xy.Y, d, 0, Math.PI * 2)
    ctx2d.stroke()
    ctx2d.fill()
    ctx2d.closePath()

    // 画静风
    if (isWind) {
      ctx2d.beginPath()
      ctx2d.arc(xy.X, xy.Y, size * 1.4, Math.PI - Math.PI * 5 / 12, Math.PI + Math.PI * 5 / 12)
      ctx2d.stroke()
      ctx2d.closePath()
    }

    let info = null
    switch (amount) {
      case 0:
        break
      case 1:
        info = '1'
        break
      case 2:
        info = '2'
        break
      case 3:
        info = '3'
        break
      case 4:
        info = '4'
        break
      case 5:
        info = '5'
        break
      case 6:
        info = '6'
        break
      case 7:
        info = '7'
        break
      case 8:
        info = '8'
        break
      case 9:
        info = '9'
        break
      case 10:
        info = '10'
        break
      default: //不明
        ctx2d.beginPath()
        let ptf1 = myPoint(xy.X, xy.Y - d)
        let ptf2 = myPoint(xy.X, xy.Y + d)
        let ptf3 = myPoint(xy.X - d, xy.Y)
        let ptf4 = myPoint(xy.X + d, xy.Y)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        let cosd = d * Math.cos(45 * Math.PI / 180)
        let sind = d * Math.sin(45 * Math.PI / 180)
        ptf1.X = xy.X - cosd
        ptf1.Y = xy.Y - sind
        ptf2.X = xy.X + cosd
        ptf2.Y = xy.Y + sind
        ptf3.X = xy.X + cosd
        ptf3.Y = xy.Y - sind
        ptf4.X = xy.X - cosd
        ptf4.Y = xy.Y + sind
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf2.X, ptf2.Y)
        ctx2d.moveTo(ptf3.X, ptf3.Y)
        ctx2d.lineTo(ptf4.X, ptf4.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        break
    }

    if (info != null) {
      let fontSize = 1.5 * d
      ctx2d.textBaseline = 'top'
      ctx2d.textAlign = 'center'
      ctx2d.font = 'bold ' + fontSize + 'px sans-serif'
      ctx2d.fillStyle = 'white'
      ctx2d.fillText(info, xy.X, xy.Y - fontSize / 2, d)
    }
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
  drawWindShape = function (windType, ctx2d, dd, ff, size, xy, color) {

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
      case 1:
        this.drawWindBarb(ctx2d, dd, ff, size, xy, color)
        break
      case 2:
        dd += Math.PI
        this.drawWindArrow(ctx2d, dd, ff, size, xy, color)
        break
    }
  }

  drawWindBarbJD = function (ctx2d, dd, ff, size, xy, color) {

    if (!ctx2d || dd < 0 || dd > 360 || ff < 1 || size < 16) {
      return
    }

    // 风向转换成弧度
    dd = dd * Math.PI / 180.0
    if (ff == 1) {
      ff = 2
    }
    if (ff >= 50) {
      ff = 50
    }

    ctx2d.strokeStyle = color

    let dw0 = size / 8.0
    let cosd = Math.cos(dd)
    let sind = Math.sin(dd)

    // 风杆
    let ptf1 = myPoint(xy.X, xy.Y)
    let ptf2 = myPoint(xy.X + size * sind, xy.Y - size * cosd)

    ctx2d.beginPath()
    ctx2d.moveTo(ptf1.X, ptf1.Y)
    ctx2d.lineTo(ptf2.X, ptf2.Y)
    ctx2d.stroke()
    ctx2d.closePath()

    // 风羽
    let n = 0, m = 0
    n = Math.floor(ff / 20)
    m = ff % 20

    let ptf3 = myPoint(0, 0)

    // 20m/s风羽
    let i = 0
    let cnt1 = 8, cnt2 = 7, cnt20 = 0, cnt4 = 0
    for (i = 0; i < n; i++) {

      ptf1.X = xy.X + cnt1 * dw0 * sind
      ptf1.Y = xy.Y - cnt1 * dw0 * cosd

      ptf2.X = xy.X + cnt2 * dw0 * sind
      ptf2.Y = xy.Y - cnt2 * dw0 * cosd

      ptf3.X = ptf1.X + dw0 * 2.0 * cosd
      ptf3.Y = ptf1.Y + dw0 * 2.0 * sind

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
    n = Math.floor(m / 4)
    m = m % 4

    for (i = 0; i < n; i++) {

      ptf1.X = xy.X + cnt1 * dw0 * sind
      ptf1.Y = xy.Y - cnt1 * dw0 * cosd

      ptf3.X = ptf1.X + dw0 * 2.0 * cosd
      ptf3.Y = ptf1.Y + dw0 * 2.0 * sind

      ctx2d.beginPath()
      ctx2d.moveTo(ptf1.X, ptf1.Y)
      ctx2d.lineTo(ptf3.X, ptf3.Y)
      ctx2d.stroke()
      ctx2d.closePath()

      cnt1--
      cnt4++
    }

    if (cnt20 + cnt4 === 0) {
      cnt1 = 8
      cnt2 = 7
    }

    // 2m/s风羽
    n = Math.floor(m / 2)
    for (i = 0; i < n; i++) {

      ptf1.X = xy.X + cnt1 * dw0 * sind
      ptf1.Y = xy.Y - cnt1 * dw0 * cosd

      ptf3.X = ptf1.X + dw0 * cosd
      ptf3.Y = ptf1.Y + dw0 * sind

      ctx2d.beginPath()
      ctx2d.moveTo(ptf1.X, ptf1.Y)
      ctx2d.lineTo(ptf3.X, ptf3.Y)
      ctx2d.stroke()
      ctx2d.closePath()

      cnt1--
      cnt2--
    }
  }

  drawWindBarb = function (ctx2d, dd, ff, size, xy, color) {

    ctx2d.strokeStyle = color

    let dw0 = size / 8.0
    let cosd = Math.cos(dd)
    let sind = Math.sin(dd)

    // 风杆
    let ptf1 = myPoint(xy.X, xy.Y)
    let ptf2 = myPoint(xy.X + 8 * dw0 * sind, xy.Y - 8 * dw0 * cosd)

    ctx2d.beginPath()
    ctx2d.moveTo(ptf1.X, ptf1.Y)
    ctx2d.lineTo(ptf2.X, ptf2.Y)
    ctx2d.stroke()
    ctx2d.closePath()

    // 风羽
    let n = 0, m = 0
    n = Math.floor(ff / 20)
    m = ff % 20

    let dpcha = dw0 * 2.0 * Math.tan(Math.PI / 3.0)
    let ptf3 = myPoint(0, 0)

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

      cnt1 -= 3
      cnt2 -= 3
      cnt20++
    }

    // 4m/s风羽
    cnt1 += 2
    cnt2 += 2
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

      ctx2d.beginPath()
      ctx2d.moveTo(ptf2.X, ptf2.Y)
      ctx2d.lineTo(ptf3.X, ptf3.Y)
      ctx2d.stroke()
      ctx2d.closePath()

      cnt1--
      cnt2--
    }
  }

  drawWindArrow = function (ctx2d, dd, ff, size, xy, color) {

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
    let ptf1 = myPoint(xy.X, xy.Y)
    let ptf2 = myPoint(xy.X + dw * sind, xy.Y - dw * cosd)

    ctx2d.beginPath()
    ctx2d.moveTo(ptf1.X, ptf1.Y)
    ctx2d.lineTo(ptf2.X, ptf2.Y)
    ctx2d.stroke()
    ctx2d.closePath()

    // 箭头
    dw0 = dw0 * 2.0
    let dpcha = dw0 * Math.tan(Math.PI / 6.0)

    let ptf4 = myPoint(ptf1.X + (dw - dw0) * sind, ptf1.Y - (dw - dw0) * cosd)

    ptf1.X = ptf2.X
    ptf1.Y = ptf2.Y

    ptf2.X = ptf4.X + dpcha * cosd
    ptf2.Y = ptf4.Y + dpcha * sind

    let ptf3 = myPoint(ptf4.X - dpcha * cosd, ptf4.Y - dpcha * sind)

    ctx2d.beginPath()
    ctx2d.moveTo(ptf2.X, ptf2.Y)
    ctx2d.lineTo(ptf1.X, ptf1.Y)
    ctx2d.lineTo(ptf3.X, ptf3.Y)
    ctx2d.stroke()
    ctx2d.closePath()
  }

  /**
   * 绘制低云状符号
   * @param ctx2d
   * @param code 类型标识 1-淡积云 2-浓积云 3-秃积雨云 4-积云性层积云 5-普通层积云 6-层云或碎层云 7-碎雨云 8-不同高度的积云和层积云 9-鬃积雨云或砧状积雨云
   * @param xy 符号左上角位置
   * @param size 符号大小缩放率 60为基数 直径为scale*60
   */
  drawClShape = function (ctx2d, code, xy, size) {

    if (size < 0.2) {
      size = 0.2
    }

    ctx2d.strokeStyle = CLclor
    ctx2d.fillStyle = CLclor

    let wdht = size * 60
    let ptf = myPoint(xy.X + wdht / 2.0, xy.Y + wdht / 2.0)
    let r = wdht / 2.0
    let d = wdht / 4.0
    let sin30d = d * Math.sin(Math.PI / 6.0)
    let cos30d = d * Math.cos(Math.PI / 6.0)
    let sin45d = d * Math.sin(Math.PI / 4.0)
    let cos45d = d * Math.cos(Math.PI / 4.0)
    let sin60d = d * Math.sin(Math.PI / 3.0)
    let cos60d = d * Math.cos(Math.PI / 3.0)

    let ptf0 = myPoint(0, 0)
    ctx2d.beginPath()
    switch (code) {
      case 1:
        ctx2d.moveTo(ptf.X, ptf.Y - 15 * size + r)
        ctx2d.arc(ptf.X, ptf.Y - 15 * size + r, r, 0, -Math.PI, true)
        ctx2d.moveTo(ptf.X - r, ptf.Y - 15 * size + r)
        ctx2d.lineTo(ptf.X + r, ptf.Y - 15 * size + r)
        ctx2d.stroke()
        break
      case 2:
        ptf0.X = ptf.X - 15 * size + d
        ptf0.Y = ptf.Y - 20 * size + d
        ctx2d.moveTo(ptf0.X - d, ptf0.Y)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, ptf.Y - 10 * size + r)
        ctx2d.arc(ptf.X, ptf.Y - 10 * size + r, r, 0, -Math.PI, true)
        ctx2d.moveTo(ptf.X - r, ptf.Y - 10 * size + r)
        ctx2d.lineTo(ptf.X + r, ptf.Y - 10 * size + r)
        ctx2d.stroke()
        break
      case 3:
        ptf0.X = ptf.X - 15 * size + d
        ptf0.Y = ptf.Y - 20 * size + d
        ctx2d.moveTo(ptf0.X - d, ptf0.Y)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, ptf.Y - 10 * size + r)
        ctx2d.arc(ptf.X, ptf.Y - 10 * size + r, r, 0, -Math.PI, true)
        ctx2d.moveTo(ptf.X - r, ptf.Y - 10 * size + r)
        ctx2d.lineTo(ptf.X + r, ptf.Y - 10 * size + r)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, ptf.Y - 20 * size)
        ctx2d.lineTo(ptf.X, ptf.Y + 5 * size)
        ctx2d.stroke()
        break
      case 4:
        ptf0.X = ptf.X
        ptf0.Y = ptf.Y
        ctx2d.moveTo(ptf0.X - d, ptf0.Y)
        ctx2d.lineTo(ptf0.X - cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf0.X - d, ptf0.Y)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y + sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y + d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X, ptf.Y)
        ctx2d.lineTo(ptf.X - d, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X + d, ptf.Y)
        ctx2d.lineTo(xy.X + wdht, ptf.Y)
        ctx2d.stroke()
        break
      case 5:
        ctx2d.moveTo(xy.X, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 4.0, ptf.Y - wdht / 8.0)
        ctx2d.arc(ptf.X, ptf.Y - wdht / 8.0, d, Math.PI, 0, true)
        ctx2d.lineTo(xy.X + wdht, ptf.Y - wdht / 8.0)
        ctx2d.stroke()
        break
      case 6:
        ctx2d.moveTo(xy.X, ptf.Y)
        ctx2d.lineTo(xy.X + wdht, ptf.Y)
        ctx2d.stroke()
        break
      case 7:
        let dw = wdht / 5.0
        ctx2d.moveTo(xy.X, ptf.Y)
        ctx2d.lineTo(xy.X + dw, ptf.Y)
        ctx2d.moveTo(xy.X + 2.0 * dw, ptf.Y)
        ctx2d.lineTo(xy.X + 3.0 * dw, ptf.Y)
        ctx2d.moveTo(xy.X + 4.0 * dw, ptf.Y)
        ctx2d.lineTo(xy.X + 5.0 * dw, ptf.Y)
        ctx2d.stroke()
        break
      case 8:
        ctx2d.moveTo(xy.X, xy.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 4.0, xy.Y + wdht / 12.0)
        ctx2d.arc(ptf.X, xy.Y + wdht / 12.0, d, Math.PI, 0, true)
        ctx2d.moveTo(ptf.X + wdht / 4.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht / 12.0)
        ctx2d.moveTo(xy.X + wdht, ptf.Y + wdht / 6.0 + d)
        ctx2d.lineTo(xy.X, ptf.Y + wdht / 6.0 + d)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0 + d, r, Math.PI, 0)
        ctx2d.stroke()
        break
      case 9:
        ctx2d.moveTo(xy.X + wdht, ptf.Y + wdht / 6.0 + d)
        ctx2d.lineTo(xy.X, ptf.Y + wdht / 6.0 + d)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0 + d, r, Math.PI, 0)
        ctx2d.moveTo(ptf.X - r * Math.cos(Math.PI / 3), ptf.Y + wdht / 6.0 + d - r * Math.sin(Math.PI / 3))
        ctx2d.lineTo(xy.X + wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + r * Math.cos(Math.PI / 3), ptf.Y + wdht / 6.0 + d - r * Math.sin(Math.PI / 3))
        ctx2d.stroke()
        break
    }
    ctx2d.closePath()
  }

  /**
   * 绘制中云状符号
   * @param ctx2d
   * @param code 类型标识 1-透光高层云 2-蔽光高层云或雨层云 3-透光高积云 4-荚状高积云 5-系统发展的辐辏状高积云
   * 6-积云性高积云 7-复高积云或蔽光高积云 8-堡状或絮状高积云 9-混乱天空的高积云
   * @param xy 符号左上角位置
   * @param size 符号大小缩放率 60为基数 直径为scale*60
   */
  drawCmShape = function (ctx2d, code, xy, size) {

    if (size < 0.2) {
      size = 0.2
    }

    ctx2d.strokeStyle = 'white'
    ctx2d.fillStyle = 'white'

    let wdht = size * 60
    let ptf = myPoint(xy.X + wdht / 2.0, xy.Y + wdht / 2.0)
    let dy, d = wdht / 4.0

    let ptf0 = myPoint(0, 0)
    ctx2d.beginPath()
    switch (code) {
      case 1:
        dy = wdht * (1.0 - Math.tan(Math.PI / 6)) / 2.0
        ctx2d.moveTo(xy.X + wdht, xy.Y + dy)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht - dy)
        ctx2d.stroke()
        break
      case 2:
        dy = wdht * (1.0 - Math.tan(Math.PI / 6)) / 2.0
        ctx2d.moveTo(xy.X + wdht, xy.Y + dy)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht - dy)
        ctx2d.moveTo(xy.X + wdht / 3.0, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X + wdht, xy.Y + dy + (wdht - 2 * dy) / 3.0)
        ctx2d.stroke()
        break
      case 3:
        ctx2d.arc(ptf.X - d, ptf.Y - d / 2.0, d, Math.PI, 0, true)
        ctx2d.arc(ptf.X + d, ptf.Y - d / 2.0, d, Math.PI, 0, true)
        ctx2d.stroke()
        break
      case 4:
        dy = wdht * (1.0 - 0.25 - Math.tan(Math.PI / 6)) / 2.0
        ctx2d.moveTo(xy.X + wdht, xy.Y + dy)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy - wdht / 4)
        ctx2d.arc(ptf.X - d, xy.Y + wdht - dy - wdht / 4, d, Math.PI, 0, true)
        ctx2d.stroke()
        break
      case 5:
        dy = wdht * (1.0 - 0.25 - Math.tan(Math.PI / 6)) / 2.0
        ptf0.X = xy.X + wdht / 4.0
        ptf0.Y = xy.Y + wdht - dy - wdht / 4.0
        ctx2d.moveTo(xy.X + wdht, xy.Y + dy)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy - wdht / 4)
        ctx2d.arc(ptf.X - d, xy.Y + wdht - dy - wdht / 4, d, Math.PI, 0, true)
        ctx2d.arc(ptf.X + d, xy.Y + wdht - dy - wdht / 4, d, Math.PI, 0, true)
        ctx2d.stroke()
        break
      case 6:
        ctx2d.arc(ptf.X - d, xy.Y + wdht / 8, d, Math.PI, 0, true)
        ctx2d.arc(ptf.X + d, xy.Y + wdht / 8, d, Math.PI, 0, true)
        ctx2d.moveTo(xy.X, xy.Y + wdht - wdht / 8)
        ctx2d.arc(ptf.X, xy.Y + wdht - wdht / 8, 2 * d, Math.PI, 0, false)
        ctx2d.stroke()
        break
      case 7:
        dy = wdht * (1.0 - 0.25 - Math.tan(Math.PI / 6)) / 2.0
        ptf0.X = xy.X + wdht / 4.0
        ptf0.Y = xy.Y + wdht - dy - wdht / 4.0
        ctx2d.moveTo(xy.X + wdht, xy.Y + dy)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy - wdht / 4)
        ctx2d.arc(ptf.X - d, xy.Y + wdht - dy - wdht / 4, d, Math.PI, 0, true)
        ctx2d.arc(ptf.X + d, xy.Y + wdht - dy - wdht / 4, d, Math.PI, 0, true)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy - wdht / 4)
        ctx2d.stroke()
        break
      case 8:
        ctx2d.moveTo(ptf.X - d, ptf.Y + d)
        ctx2d.lineTo(ptf.X - d, ptf.Y - d)
        ctx2d.arc(ptf.X, ptf.Y - d, d, Math.PI, 0, true)
        ctx2d.lineTo(ptf.X + d, ptf.Y + d)
        ctx2d.stroke()
        break
      case 9:
        dy = wdht * (1.0 - 0.25 - Math.tan(Math.PI / 6)) / 2.0
        ctx2d.moveTo(xy.X + wdht, xy.Y + dy)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy - wdht / 3)
        ctx2d.arc(ptf.X - d, xy.Y + wdht - dy - wdht / 3, d, Math.PI, 0, true)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        let alpha = Math.acos(2 / 3)
        ctx2d.arc(ptf.X - d, xy.Y + wdht - dy - wdht / 3, 1.5 * d, Math.PI - alpha, alpha, true)
        ctx2d.stroke()
        break
    }
    ctx2d.closePath()
  }

  /**
   * 绘制高云状符号
   * @param ctx2d
   * @param code 类型标识 1-毛卷云 2-密卷云 3-伪卷云 4-钩卷云 5～8-卷层云 9-卷积云
   * @param xy 符号左上角位置
   * @param size 符号大小缩放率 60为基数 直径为scale*60
   */
  drawChShape = function (ctx2d, code, xy, size) {

    if (size < 0.2) {
      size = 0.2
    }

    ctx2d.strokeStyle = 'white'
    ctx2d.fillStyle = 'white'

    let wdht = size * 60
    let ptf = myPoint(xy.X + wdht / 2.0, xy.Y + wdht / 2.0)
    let x1, y1, dy, d = wdht / 6.0
    let sin30d = d * Math.sin(Math.PI / 6.0)
    let cos30d = d * Math.cos(Math.PI / 6.0)
    let sin45d = d * Math.sin(Math.PI / 4.0)
    let cos45d = d * Math.cos(Math.PI / 4.0)
    let sin60d = d * Math.sin(Math.PI / 3.0)
    let cos60d = d * Math.cos(Math.PI / 3.0)

    let color = 'white'
    ctx2d.strokeStyle = color
    ctx2d.fillStyle = 'black'

    let ptf0 = myPoint(0, 0)
    ctx2d.beginPath()
    switch (code) {
      case 1:
        ptf0.X = xy.X + wdht - d
        ptf0.Y = ptf.Y
        ctx2d.moveTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y + d)
        ctx2d.lineTo(xy.X, ptf.Y + d)
        ctx2d.stroke()
        break
      case 2:
        ptf0.X = xy.X + wdht - d - wdht / 5.0
        ptf0.Y = ptf.Y
        ctx2d.moveTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y + d)

        ptf0.X = xy.X + wdht - d
        ptf0.Y = ptf.Y
        ctx2d.moveTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y + d)

        ctx2d.lineTo(xy.X, ptf.Y + d)
        ctx2d.stroke()
        break
      case 3:
        ptf0.X = xy.X + wdht - d
        ptf0.Y = ptf.Y
        ctx2d.moveTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y + d)

        ctx2d.moveTo(xy.X + wdht - d, ptf.Y - d)
        ctx2d.lineTo(xy.X, ptf.Y - d)
        ctx2d.stroke()
        break
      case 4:
        x1 = wdht - (d - sin30d)
        y1 = x1 * Math.tan(Math.PI / 6)
        dy = (wdht - (d + cos30d) - y1) / 2.0
        ptf0.X = xy.X + x1 - sin30d
        ptf0.Y = xy.Y + wdht - dy - y1 - cos30d

        ctx2d.moveTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)

        ctx2d.moveTo(xy.X, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X + x1, xy.Y + wdht - dy - y1)
        ctx2d.stroke()
        break
      case 5:
        x1 = wdht / 3.0
        y1 = x1 * Math.tan(Math.PI / 6)
        dy = (wdht - (d + cos30d) - y1) / 2.0
        ptf0.X = xy.X + x1 - sin30d
        ptf0.Y = xy.Y + wdht - dy - y1 - cos30d

        ctx2d.moveTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)

        ctx2d.lineTo(xy.X, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht - dy)
        ctx2d.stroke()
        break
      case 6:
        x1 = wdht - (d - sin30d)
        y1 = x1 * Math.tan(Math.PI / 6)
        dy = (wdht - (d + cos30d) - y1) / 2.0
        ptf0.X = xy.X + x1 - sin30d
        ptf0.Y = xy.Y + wdht - dy - y1 - cos30d

        ctx2d.moveTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)

        ctx2d.lineTo(xy.X, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X + wdht / 3.0, xy.Y + wdht - dy)
        ctx2d.stroke()
        break
      case 7:
        x1 = wdht / 3.0
        y1 = x1 * Math.tan(Math.PI / 6)
        dy = (wdht - (d + cos30d) - y1) / 2.0
        ptf0.X = xy.X + x1 - sin30d
        ptf0.Y = xy.Y + wdht - dy - y1 - cos30d

        ctx2d.moveTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)

        ctx2d.lineTo(xy.X, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht - dy)

        ptf0.X = xy.X + wdht - x1 + sin30d
        ptf0.Y = xy.Y + wdht - dy - y1 - cos30d

        ctx2d.moveTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X - cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X - d, ptf0.Y)
        ctx2d.lineTo(ptf0.X - cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y + sin60d)

        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht - dy)

        ctx2d.stroke()
        break
      case 8:
        x1 = wdht / 3.0
        y1 = x1 * Math.tan(Math.PI / 6)
        dy = (wdht - (d + cos30d) - y1) / 2.0
        ptf0.X = xy.X + wdht - x1 + sin30d
        ptf0.Y = xy.Y + wdht - dy - y1 - cos30d

        ctx2d.moveTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X - cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X - d, ptf0.Y)
        ctx2d.lineTo(ptf0.X - cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X - cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X - cos60d, ptf0.Y + sin60d)

        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht - dy)
        ctx2d.lineTo(xy.X, xy.Y + wdht - dy)
        ctx2d.stroke()
        break
      case 9:
        x1 = wdht - (d - sin30d)
        y1 = x1 * Math.tan(Math.PI / 6)
        dy = wdht - (d + cos30d) - y1
        ptf0.X = xy.X + x1 - sin30d
        ptf0.Y = xy.Y + wdht - dy - y1 - cos30d

        ctx2d.moveTo(ptf0.X - cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X, ptf0.Y - d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y - sin60d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y - sin45d)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y - sin30d)
        ctx2d.lineTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + cos30d, ptf0.Y + sin30d)
        ctx2d.lineTo(ptf0.X + cos45d, ptf0.Y + sin45d)
        ctx2d.lineTo(ptf0.X + cos60d, ptf0.Y + sin60d)

        ctx2d.lineTo(xy.X, xy.Y + wdht - dy)
        ctx2d.arc(xy.X + d, xy.Y + wdht - dy, d, Math.PI, 0, true)
        ctx2d.arc(xy.X + 3 * d, xy.Y + wdht - dy, d, Math.PI, 0, true)
        ctx2d.stroke()
        break
    }

    ctx2d.closePath()
  }

  /**
   * 绘制天气现象符号
   * @param ctx2d
   * @param whType 类型标识 -1-过去天气 1-现在天气
   * @param code 类型标识 1-云在消失变薄 2-云大致无变化 3-云在发展增厚 4-烟雾、吹烟 5-霾 6-浮尘 7-扬沙 8-尘卷风 9-沙尘暴
   *  10-轻雾 11-片状或带状浅雾 12-层状浅雾 13-远电、闪电 14-降水但未及地 15-降水距本站5km外 16-降水距本站5km内 17-闻雷但测站无降水 18-飑 19-龙卷
   *  20-29：观测前一小时内天气 20-有毛毛雨 21-有雨 22-有雪 23-有雨夹雪 24-有毛毛雨或雨并有雨凇 25-有阵雨 26-有阵雪 27-有冰雹或冰粒或霰 28-有雾 29-有雷暴
   *  30-中轻度的沙尘暴过去一小时内减弱 31-中轻度的沙尘暴 32-中轻度的沙尘暴过去一小时内加强 33-强的沙尘暴过去一小时内减弱 34-强的沙尘暴
   *  35-强的沙尘暴过去一小时内加强 36-中轻度的低吹雪 37-强的低吹雪 38-中轻度的高吹雪 39-强的高吹雪
   *  40-近处有雾但过去1小时内测站没有 41-散片的雾呈带状 42-雾，过去1小时内变薄天顶可辨 43-雾，过去1小时内变薄天顶不可辨 44-雾，过去1小时内无变化天顶可辨
   *  45-雾，过去1小时内无变化天顶不可辨 46-雾，过去1小时内变浓天顶可辨 47-雾，过去1小时内变浓天顶不可辨 48-雾，有雾淞天顶可辨 49-雾，有雾淞天顶不可辨
   * 50-间歇性轻毛毛雨 51-连续性轻毛毛雨 52-间歇性中毛毛雨 53-连续性中毛毛雨 54-间歇性浓毛毛雨
   *  55-连续性浓毛毛雨 56-轻毛毛雨并有雨凇 57-中或浓毛毛雨并有雨凇 58-轻毛毛雨夹雨 59-中或浓毛毛雨夹雨
   *  60-间歇性小雨 61-连续性小雨 62-间歇性中雨 63-连续性中雨 64-间歇性大雨 65-连续性大雨 66-轻毛毛雨并有雨凇 67-中或大雨并有雨凇 68-小雨夹雨69-中或大雨夹雨
   *  70-间歇性小雪 71-连续性小雪 72-间歇性中雪 73-连续性中雪 74-间歇性大雪 75-连续性大雪 76-冰针或伴有雾 77-米雪或伴有雾 78-孤立的星状雪晶或伴有雾 79-冰粒
   *  80-小阵雨 81-中常或大的阵雨 82-强阵雨 83-小的阵雨夹雪 84-中常或大的阵雨夹雪 85-小阵雪 86-中常或大的阵雪
   *  87-小的阵性霰或小冰雹或有雨或有雨夹雪 88-中常或大的阵性霰或小冰雹或有雨或有雨夹雪 89-轻的冰雹或有雨或有雨夹雪
   *  90-中常或大的冰雹或有雨或有雨夹雪 91-观测前1小时内有雷暴，观测时有小雨 92-观测前1小时内有雷暴，观测时有中到雨
   *  93-观测前1小时内有雷暴，观测时有小雪 94-观测前1小时内有雷暴，观测时有中到雪 95-小或中常的雷暴，并有雨或雨夹雪
   *  96-小或中常的雷暴，并有冰雹或霰 97-大雷暴，并有雨或雪或雨夹雪 98-雷暴伴有沙尘暴 99-大雷暴，并有冰雹或霰
   * @param xy 符号左上角位置
   * @param size 符号大小缩放率 60为基数 直径为scale*60
   */
  drawWeathShape = function (ctx2d, whType, code, xy, size) {

    if (code < 0 || code > 99 || (whType != -1 && whType != 1)) {
      return
    }

    if (whType === -1 && code < 4) {
      return
    }

    this.drawWWShape(ctx2d, code, xy, size)
  }

  drawWWShape = function (ctx2d, code, xy, size) {

    if (size < 0.2) {
      size = 0.2
    }

    ctx2d.strokeStyle = WSclor
    ctx2d.fillStyle = WSclor

    let alpai
    let wdht = size * 60
    let dx, cosd, sind, dpcha
    let d = wdht / 6.0, a, b
    let ptf = myPoint(xy.X + wdht / 2.0, xy.Y + wdht / 2.0)
    let sin30d = d * Math.sin(Math.PI / 6.0)
    let cos30d = d * Math.cos(Math.PI / 6.0)
    let sin45d = d * Math.sin(Math.PI / 4.0)
    let cos45d = d * Math.cos(Math.PI / 4.0)
    let sin60d = d * Math.sin(Math.PI / 3.0)
    let cos60d = d * Math.cos(Math.PI / 3.0)

    let ptf1, ptf4, ptf0 = myPoint(0, 0)
    ctx2d.beginPath()
    switch (code) {
      case 0:
        ctx2d.arc(ptf.X, ptf.Y, wdht / 4.0, 0, Math.PI * 2)
        ctx2d.stroke()
        break
      case 1:
        ctx2d.arc(ptf.X, ptf.Y, wdht / 4.0, 0, Math.PI * 2)
        ctx2d.moveTo(ptf.X, ptf.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht - wdht / 12.0)
        ctx2d.stroke()
        break
      case 2:
        ctx2d.arc(ptf.X, ptf.Y, wdht / 4.0, 0, Math.PI * 2)
        ctx2d.moveTo(ptf.X - wdht / 4.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht / 12.0, ptf.Y)
        ctx2d.moveTo(ptf.X + wdht / 4.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y)
        ctx2d.stroke()
        break
      case 3:
        ctx2d.arc(ptf.X, ptf.Y, wdht / 4.0, 0, Math.PI * 2)
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht / 12.0)
        ctx2d.stroke()
        break
      case 4:
        let dx1 = wdht / 10.0
        dx = (wdht - 2 * dx1) / 10.0
        let ptfxy = myPoint(xy.X + dx1, xy.Y + dx1)
        ctx2d.moveTo(ptfxy.X, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + dx, ptfxy.Y)
        ctx2d.lineTo(ptfxy.X + 2 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 3 * dx, ptfxy.Y + 2 * dx)
        ctx2d.lineTo(ptfxy.X + 4 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 5 * dx, ptfxy.Y)
        ctx2d.lineTo(ptfxy.X + 6 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 7 * dx, ptfxy.Y + 2 * dx)
        ctx2d.lineTo(ptfxy.X + 8 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 9 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 10 * dx, ptfxy.Y + dx)

        ctx2d.moveTo(ptfxy.X, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X, xy.Y + wdht - dx1)
        ctx2d.stroke()
        break
      case 5:
        ctx2d.arc(ptf.X - wdht / 6.0, ptf.Y, wdht / 6.0, 0, Math.PI, true)
        ctx2d.arc(ptf.X - wdht / 6.0, ptf.Y, wdht / 6.0, Math.PI, 0, true)
        ctx2d.arc(ptf.X + wdht / 6.0, ptf.Y, wdht / 6.0, Math.PI, 0, true)
        ctx2d.arc(ptf.X + wdht / 6.0, ptf.Y, wdht / 6.0, 0, Math.PI, true)
        ctx2d.stroke()
        break
      case 6:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.stroke()
        break
      case 7:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.moveTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X, xy.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, xy.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, xy.Y + wdht / 12.0)
        ctx2d.fill()
        break
      case 8:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, -Math.PI / 2 + Math.PI / 12, Math.PI / 6, true)
        ctx2d.arc(ptf.X, ptf.Y, wdht / 6.0, -Math.PI / 6, Math.PI / 6, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 6, Math.PI / 2 - Math.PI / 12, true)
        ctx2d.stroke()
        break
      case 9:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.moveTo(xy.X + wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht / 12.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht / 6.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y + wdht / 12.0)
        ctx2d.fill()
        break
      case 10:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 12.0)
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        break
      case 11:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        break
      case 12:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        break
      case 13:
        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0.X = ptf.X + wdht / 6.0
        ptf0.Y = ptf.Y + wdht / 3.0
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 6.0)
        ctx2d.lineTo(ptf0.X - wdht / 6.0, ptf0.Y)
        ctx2d.fill()
        break
      case 14:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 12.0, wdht / 12.0, 0, Math.PI * 2)
        ctx2d.fill()
        break
      case 15:
        ctx2d.moveTo(ptf.X - wdht / 4.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 4.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y, wdht / 12.0, 0, Math.PI * 2)
        ctx2d.fill()
        break
      case 16:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 4.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y, wdht / 12.0, 0, Math.PI * 2)
        ctx2d.fill()
        break
      case 17:
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0.X = ptf.X + wdht / 3.0
        ptf0.Y = ptf.Y + wdht / 3.0
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 6.0)
        ctx2d.lineTo(ptf0.X - wdht / 6.0, ptf0.Y)
        ctx2d.fill()
        break
      case 18:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.stroke()
        break
      case 19:
        ctx2d.moveTo(ptf.X - wdht / 12.0 - wdht / 6.0, ptf.Y - wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 6.0, ptf.Y + wdht * 3 / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 + wdht / 6.0, ptf.Y - wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y + wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0 + wdht / 6.0, ptf.Y + wdht * 3 / 8.0)
        ctx2d.stroke()
        break
      case 20:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - 3.0 * d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))

        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ctx2d.moveTo(ptf.X - wdht / 24.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 8.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 8.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 24.0, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 8.0 + wdht / 24.0, ptf.Y - wdht / 12.0 + wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 21:
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 12.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 22:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 12.0 - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0 + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        break
      case 23:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0 - wdht / 18.0, ptf.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 + wdht / 18.0, ptf.Y + wdht / 4.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0 + wdht / 18.0, ptf.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 18.0, ptf.Y + wdht / 4.0)

        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 12.0, ptf.Y - wdht / 4.0 + wdht / 12.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 24:
        ctx2d.moveTo(xy.X + wdht - wdht / 4.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 4.0, ptf.Y)
        ctx2d.arc(xy.X + wdht - wdht / 4.0 - wdht / 8.0, ptf.Y, wdht / 8.0, -Math.PI / 6, Math.PI, false)
        ctx2d.arc(xy.X + wdht - wdht / 2.0 - wdht / 8.0, ptf.Y, wdht / 8.0, 0, Math.PI - Math.PI / 6, true)
        ctx2d.stroke()
        break
      case 25:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)

        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 12.0, ptf.Y - wdht / 4.0 + wdht / 12.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 26:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)

        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0 - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 + wdht / 18.0, ptf.Y - wdht / 4.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0 + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 18.0, ptf.Y - wdht / 4.0)
        ctx2d.stroke()
        break
      case 27:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)

        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 12.0)

        ctx2d.stroke()
        break
      case 28:
        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        break
      case 29:
        ctx2d.moveTo(ptf.X + wdht / 3.0 - wdht / 12.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0 - wdht / 12.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X + wdht / 6.0 - wdht / 12.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0 - wdht / 12.0, ptf.Y - wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0 - wdht / 12.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0 - wdht / 12.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 4.0, ptf.Y - wdht * 5 / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y - wdht * 5 / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y + wdht * 5 / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y + wdht * 5 / 12.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0 = myPoint(ptf.X + wdht / 3.0 - wdht / 12.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 6.0)
        ctx2d.lineTo(ptf0.X - wdht / 6.0, ptf0.Y)
        ctx2d.fill()
        break
      case 30:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.moveTo(xy.X + wdht - wdht / 12.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y + wdht / 12.0)
        ctx2d.fill()
        break
      case 31:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y + wdht / 12.0)
        ctx2d.fill()
        break
      case 32:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.moveTo(xy.X + wdht / 12.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht / 12.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0 - wdht / 12.0, ptf.Y + wdht / 12.0)
        ctx2d.fill()
        break
      case 33:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 24.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y - wdht / 24.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y + wdht / 24.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y + wdht / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 12.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.stroke()
        break
      case 34:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 24.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y - wdht / 24.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y + wdht / 24.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y + wdht / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        break
      case 35:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 24.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y - wdht / 24.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y + wdht / 24.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, ptf.Y + wdht / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(xy.X + wdht / 12.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht / 12.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.stroke()
        break
      case 36:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 12.0)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.fill()
        break
      case 37:
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 24.0)
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.fill()
        break
      case 38:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 12.0)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.fill()
        break
      case 39:
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 24.0)
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.fill()
        break
      case 40:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht / 12.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht / 6.0, ptf.Y + wdht / 4.0)

        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 4.0)
        ctx2d.stroke()
        break
      case 41:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        break
      case 42:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 12.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y + wdht / 4.0)
        ctx2d.stroke()
        break
      case 43:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 12.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0, ptf.Y + wdht / 4.0)
        ctx2d.stroke()
        break
      case 44:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        break
      case 45:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        break
      case 46:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht / 12.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht / 12.0, ptf.Y + wdht / 4.0)
        ctx2d.stroke()
        break
      case 47:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht / 12.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht / 12.0, ptf.Y + wdht / 4.0)
        ctx2d.stroke()
        break
      case 48:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()

        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y)
        ctx2d.fill()
        break
      case 49:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y)
        ctx2d.fill()
        break
      case 50:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 51:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - b, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X + d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 8.0 + wdht / 24.0, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X + wdht / 12.0, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 52:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - d, ptf.Y - 4.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X - d, ptf.Y + 2.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 24.0 - wdht / 8.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y - wdht / 24.0 + wdht / 8.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 53:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - d, ptf.Y - 4.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X - 3.0 * d, ptf.Y + 2.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X + d, ptf.Y + 2.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 24.0 - wdht / 8.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X - wdht / 8.0 + wdht / 24.0, ptf.Y - wdht / 24.0 + wdht / 8.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X + wdht / 12.0, ptf.Y - wdht / 24.0 + wdht / 8.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 54:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - d, ptf.Y - 8.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X - d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X - d, ptf.Y + 6.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 12.0 - wdht / 4.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 24.0 + wdht * 7 / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 55:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - d, ptf.Y - 5.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X - d, ptf.Y + 3.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X - 4.0 * d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X + 2.0 * d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 12.0 - wdht / 8.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 8.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 8.0, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X + wdht / 8.0, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 56:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - 7.0 * d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ctx2d.moveTo(ptf.X - 5 * wdht / 12.0, ptf.Y)
        ctx2d.arc(ptf.X - 5 * wdht / 24.0, ptf.Y, 5 * wdht / 24.0, Math.PI - Math.PI / 6, 0, false)
        ctx2d.arc(ptf.X + 5 * wdht / 24.0, ptf.Y, 5 * wdht / 24.0, Math.PI, -Math.PI / 6, true)

        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - 7.0 * d + wdht / 24.0, ptf.Y - 2.0 * d + wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 57:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - 7.0 * d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X + 2.0 * d, ptf.Y - d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + wdht / 6.0, ptf0.Y)
        ctx2d.lineTo(ptf0.X + wdht / 8.0 + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X + wdht / 8.0, ptf1.Y)
        ctx2d.lineTo(ptf0.X + wdht / 8.0, ptf0.Y + 3.0 * d)

        ctx2d.moveTo(ptf.X - 5 * wdht / 12.0, ptf.Y)
        ctx2d.arc(ptf.X - 5 * wdht / 24.0, ptf.Y, 5 * wdht / 24.0, Math.PI - Math.PI / 6, 0, false)
        ctx2d.arc(ptf.X + 5 * wdht / 24.0, ptf.Y, 5 * wdht / 24.0, Math.PI, -Math.PI / 6, true)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 4.0, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X + wdht / 8.0 + wdht / 8.0, ptf.Y - wdht / 24.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 58:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - d, ptf.Y + 2.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y + wdht / 12.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 59:
        d = wdht / 24.0
        a = d * d
        b = 3.0 * d
        ptf0 = myPoint(ptf.X - d, ptf.Y + 4.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)

        ptf0 = myPoint(ptf.X - d, ptf.Y - 6.0 * d)
        dx = b * (Math.sqrt(((a - (d / 3.0) * (d / 3.0)) / a)))
        ptf1 = myPoint(ptf0.X + d / 3.0, ptf0.Y + dx)
        dx = b * (Math.sqrt(((a - (d * 2 / 3.0) * (d * 2 / 3.0)) / a)))
        ctx2d.moveTo(ptf0.X + d, ptf0.Y)
        ctx2d.lineTo(ptf0.X + d * 2 / 3.0, ptf0.Y + dx)
        ctx2d.lineTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y + 3.0 * d)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y - wdht / 4.0, wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 60:
        ctx2d.arc(ptf.X, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 61:
        ctx2d.arc(ptf.X - wdht / 6.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X + wdht / 6.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 62:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 63:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht / 8.0, ptf.Y + wdht / 8.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X + wdht / 8.0, ptf.Y + wdht / 8.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 64:
        ctx2d.arc(ptf.X, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht * 5 / 24.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y + wdht * 5 / 24.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 65:
        ctx2d.arc(ptf.X, ptf.Y - wdht * 5 / 24.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y + wdht * 5 / 24.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht * 5 / 24.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X + wdht * 5 / 24.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 66:
        ctx2d.arc(ptf.X - wdht * 5 / 24.0, ptf.Y, wdht * 5 / 24.0, Math.PI - Math.PI / 6, 0, false)
        ctx2d.arc(ptf.X + wdht * 5 / 24.0, ptf.Y, wdht * 5 / 24.0, Math.PI, -Math.PI / 6, true)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht * 5 / 24.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 67:
        ctx2d.arc(ptf.X - wdht * 5 / 24.0, ptf.Y, wdht * 5 / 24.0, Math.PI - Math.PI / 6, 0, false)
        ctx2d.arc(ptf.X + wdht * 5 / 24.0, ptf.Y, wdht * 5 / 24.0, Math.PI, -Math.PI / 6, true)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X - wdht * 5 / 24.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X + wdht * 5 / 24.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 68:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 4.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 4.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 69:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht * 7 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht * 7 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 8.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y - wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y + wdht * 7 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y + wdht * 7 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 8.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y + wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y + wdht * 5 / 24.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 70:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        break
      case 71:
        ctx2d.moveTo(ptf.X - wdht / 8.0 - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 8.0 + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 - wdht / 8.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 8.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 8.0 + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 8.0 - wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 8.0 - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 8.0 + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 + wdht / 8.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0 + wdht / 8.0, ptf.Y)

        ctx2d.moveTo(ptf.X + wdht / 8.0 + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 8.0 - wdht / 18.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        break
      case 72:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 8.0)

        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y + wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)
        ctx2d.stroke()
        break
      case 73:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 8.0)

        ctx2d.moveTo(ptf.X - wdht / 8.0 - wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 8.0 + wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 - wdht / 8.0, ptf.Y + wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 8.0, ptf.Y + wdht / 8.0)

        ctx2d.moveTo(ptf.X - wdht / 8.0 + wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 8.0 - wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 8.0 - wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 8.0 + wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 + wdht / 8.0, ptf.Y + wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 + wdht / 8.0, ptf.Y + wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 8.0 + wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 8.0 - wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)
        ctx2d.stroke()
        break
      case 74:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0 - wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0 - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0 - wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0 - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0 + wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0 + wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y + wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0 + wdht * 5 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0 + wdht * 5 / 24.0)
        ctx2d.stroke()
        break
      case 75:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 6.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 6.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 6.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0 - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0 + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 6.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 6.0 + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0 - wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 6.0 - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0 + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0 + wdht / 6.0, ptf.Y)

        ctx2d.moveTo(ptf.X + wdht / 6.0 + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0 - wdht / 18.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        break
      case 76:
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht * 2 / 9.0, ptf.Y - wdht / 9.0)
        ctx2d.lineTo(ptf.X - wdht * 2 / 9.0, ptf.Y + wdht / 9.0)

        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht * 2 / 9.0, ptf.Y - wdht / 9.0)
        ctx2d.lineTo(ptf.X + wdht * 2 / 9.0, ptf.Y + wdht / 9.0)
        ctx2d.fill()
        break
      case 77:
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.stroke()
        break
      case 78:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.stroke()
        break
      case 79:
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y + wdht / 24.0, 1.5 * wdht / 24.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 80:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht * 7 / 24.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 81:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)

        ctx2d.moveTo(ptf.X - wdht / 9.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 9.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht * 7 / 24.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 82:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, xy.Y + wdht / 12.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 83:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, xy.Y + wdht / 12.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 84:
        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y - wdht / 12.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 9.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 9.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, xy.Y + wdht / 12.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 85:
        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y - wdht * 7 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht * 7 / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht * 9 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht * 9 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.stroke()
        break
      case 86:
        ctx2d.moveTo(ptf.X - wdht / 12.0, ptf.Y - wdht * 7 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht * 7 / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 18.0, ptf.Y - wdht * 9 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 18.0, ptf.Y - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X + wdht / 18.0, ptf.Y - wdht * 9 / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 18.0, ptf.Y - wdht * 5 / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 9.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 9.0, ptf.Y)
        ctx2d.stroke()
        break
      case 87:
        ctx2d.moveTo(ptf.X, xy.Y + wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht / 24.0)

        ctx2d.moveTo(ptf.X, xy.Y + wdht - wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht - wdht / 24.0)
        ctx2d.stroke()
        break
      case 88:
        ctx2d.moveTo(ptf.X, xy.Y + wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht / 24.0)

        ctx2d.moveTo(ptf.X, xy.Y + wdht - wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht - wdht / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 9.0, ptf.Y + wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 9.0, ptf.Y + wdht / 8.0)
        ctx2d.stroke()
        break
      case 89:
        ctx2d.moveTo(ptf.X, xy.Y + wdht - wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht - wdht / 24.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, xy.Y + wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.fill()
        break
      case 90:
        ctx2d.moveTo(ptf.X, xy.Y + wdht - wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht - wdht * 13 / 24.0)
        ctx2d.lineTo(ptf.X, xy.Y + wdht - wdht / 24.0)

        ctx2d.moveTo(ptf.X - wdht / 9.0, ptf.Y + wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 9.0, ptf.Y + wdht / 8.0)

        ctx2d.moveTo(ptf.X - wdht / 9.0, ptf.Y + wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 9.0, ptf.Y + wdht / 8.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, xy.Y + wdht / 24.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht * 3 / 8.0)
        ctx2d.fill()
        break
      case 91:
        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf1 = myPoint(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf1.X, ptf1.Y - wdht / 6.0)
        ctx2d.lineTo(ptf1.X - wdht / 6.0, ptf1.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(xy.X + wdht - wdht / 12.0, ptf.Y, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 92:
        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf1 = myPoint(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf1.X, ptf1.Y - wdht / 6.0)
        ctx2d.lineTo(ptf1.X - wdht / 6.0, ptf1.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(xy.X + wdht - wdht / 12.0, ptf.Y - wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.arc(xy.X + wdht - wdht / 12.0, ptf.Y + wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 93:
        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf1 = myPoint(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf1.X, ptf1.Y - wdht / 6.0)
        ctx2d.lineTo(ptf1.X - wdht / 6.0, ptf1.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht - wdht / 12.0 - wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0 + wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 12.0 + wdht / 18.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0 - wdht / 18.0, ptf.Y + wdht / 12.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht, ptf.Y)
        ctx2d.stroke()
        break
      case 94:
        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 3.0)

        ctx2d.moveTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 4.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.lineTo(xy.X + wdht - wdht * 5 / 12.0, xy.Y + wdht - wdht / 12.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf1 = myPoint(ptf.X + wdht / 6.0, ptf.Y + wdht / 3.0)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf1.X, ptf1.Y - wdht / 6.0)
        ctx2d.lineTo(ptf1.X - wdht / 6.0, ptf1.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht - wdht / 12.0 - wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 8.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0 + wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 8.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 12.0 + wdht / 18.0, ptf.Y - wdht / 12.0 - wdht / 8.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0 - wdht / 18.0, ptf.Y + wdht / 12.0 - wdht / 8.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y - wdht / 8.0)
        ctx2d.lineTo(xy.X + wdht, ptf.Y - wdht / 8.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 12.0 - wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0 + wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 12.0 + wdht / 18.0, ptf.Y - wdht / 12.0 + wdht / 8.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 12.0 - wdht / 18.0, ptf.Y + wdht / 12.0 + wdht / 8.0)

        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y + wdht / 8.0)
        ctx2d.lineTo(xy.X + wdht, ptf.Y + wdht / 8.0)
        ctx2d.stroke()
        break
      case 95:
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 2.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 2.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf1 = myPoint(ptf.X + wdht / 3.0, ptf.Y + wdht / 2.0)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf1.X, ptf1.Y - wdht / 6.0)
        ctx2d.lineTo(ptf1.X - wdht / 6.0, ptf1.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, xy.Y + wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 96:
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 2.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 2.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf1 = myPoint(ptf.X + wdht / 3.0, ptf.Y + wdht / 2.0)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf1.X, ptf1.Y - wdht / 6.0)
        ctx2d.lineTo(ptf1.X - wdht / 6.0, ptf1.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, xy.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X, xy.Y)
        ctx2d.stroke()
        break
      case 97:
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 3.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 9.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 9.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0 + wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 2.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        alpai = Math.atan(2 / 3.0)
        cosd = Math.cos(alpai)
        sind = Math.sin(alpai)
        dpcha = wdht / 6.0 * Math.tan(alpai)
        ptf1 = myPoint(ptf.X, ptf.Y + wdht / 3.0 + wdht / 6.0)
        ptf4 = myPoint(ptf1.X + wdht / 6.0 * cosd, ptf1.Y - wdht / 6.0 * sind)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf4.X + dpcha * sind, ptf4.Y + dpcha * cosd)
        ctx2d.lineTo(ptf4.X - dpcha * sind, ptf4.Y - dpcha * cosd)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, xy.Y + wdht / 6.0, wdht / 12.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 98:
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 2.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 2.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf1 = myPoint(ptf.X + wdht / 3.0, ptf.Y + wdht / 2.0)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf1.X, ptf1.Y - wdht / 6.0)
        ctx2d.lineTo(ptf1.X - wdht / 6.0, ptf1.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()

        ctx2d.arc(ptf.X, xy.Y + wdht / 16.0, wdht / 16.0, 0, Math.PI, true)
        ctx2d.arc(ptf.X, xy.Y + 3 * wdht / 16.0, wdht / 16.0, -Math.PI / 2, Math.PI, false)

        ctx2d.moveTo(ptf.X - wdht / 6.0, xy.Y + wdht / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht / 8.0)
        ctx2d.stroke()
        break
      case 99:
        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 3.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 9.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 9.0 + wdht / 6.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0 + wdht / 6.0)

        ctx2d.moveTo(xy.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 2.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        alpai = Math.atan(2 / 3.0)
        cosd = Math.cos(alpai)
        sind = Math.sin(alpai)
        dpcha = wdht / 6.0 * Math.tan(alpai)
        ptf1 = myPoint(ptf.X, ptf.Y + wdht / 3.0 + wdht / 6.0)
        ptf4 = myPoint(ptf1.X + wdht / 6.0 * cosd, ptf1.Y - wdht / 6.0 * sind)
        ctx2d.moveTo(ptf1.X, ptf1.Y)
        ctx2d.lineTo(ptf4.X + dpcha * sind, ptf4.Y + dpcha * cosd)
        ctx2d.lineTo(ptf4.X - dpcha * sind, ptf4.Y - dpcha * cosd)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, xy.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht / 4.0)
        ctx2d.lineTo(ptf.X, xy.Y)
        ctx2d.stroke()
        break
    }
    ctx2d.closePath()
  }

  drawWWShapeJD = function (ctx2d, code, xy, size) {

    if (code < 4 || code > 100) {
      return
    }

    if (size < 0.2) {
      size = 0.2
    }

    if ((code >= 10 && code <= 12) || (code >= 40 && code <= 47) || code == 28 || code == 48 || code == 49) {
      ctx2d.strokeStyle = 'yellow'
      ctx2d.fillStyle = 'yellow'
    } else if ((code >= 4 && code <= 9) || (code >= 30 && code <= 35) || code == 100) {
      ctx2d.strokeStyle = 'brown'
      ctx2d.fillStyle = 'brown'
    } else if ((code >= 87 && code <= 90) || (code >= 91 && code <= 95) || code == 56 || code == 57 || code == 66 || code == 67
      || code == 27 || code == 13 || code == 18 || code == 19 || code == 17 || code == 29 || code == 97 || code == 96 || code == 99 || code == 98) {
      ctx2d.strokeStyle = 'red'
      ctx2d.fillStyle = 'red'
    } else {
      ctx2d.strokeStyle = 'green'
      ctx2d.fillStyle = 'green'
    }

    let alpai
    let wdht = size * 60
    let dx, cosd, sind, dpcha
    let d = wdht / 6.0, a, b
    let ptf = myPoint(xy.X + wdht / 2.0, xy.Y + wdht / 2.0)
    let sin30d = d * Math.sin(Math.PI / 6.0)
    let cos30d = d * Math.cos(Math.PI / 6.0)
    let sin45d = d * Math.sin(Math.PI / 4.0)
    let cos45d = d * Math.cos(Math.PI / 4.0)
    let sin60d = d * Math.sin(Math.PI / 3.0)
    let cos60d = d * Math.cos(Math.PI / 3.0)

    let ptf1, ptf4, ptf0 = myPoint(0, 0)
    ctx2d.beginPath()
    switch (code) {
      case 4:
        let dx1 = wdht / 10.0
        dx = (wdht - 2 * dx1) / 10.0
        let ptfxy = myPoint(xy.X + dx1, xy.Y + dx1)
        ctx2d.moveTo(ptfxy.X, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + dx, ptfxy.Y)
        ctx2d.lineTo(ptfxy.X + 2 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 3 * dx, ptfxy.Y + 2 * dx)
        ctx2d.lineTo(ptfxy.X + 4 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 5 * dx, ptfxy.Y)
        ctx2d.lineTo(ptfxy.X + 6 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 7 * dx, ptfxy.Y + 2 * dx)
        ctx2d.lineTo(ptfxy.X + 8 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 9 * dx, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X + 10 * dx, ptfxy.Y + dx)

        ctx2d.moveTo(ptfxy.X, ptfxy.Y + dx)
        ctx2d.lineTo(ptfxy.X, xy.Y + wdht - dx1)
        ctx2d.stroke()
        break
      case 5:
        ctx2d.arc(ptf.X - wdht / 6.0, ptf.Y, wdht / 6.0, 0, Math.PI, true)
        ctx2d.arc(ptf.X - wdht / 6.0, ptf.Y, wdht / 6.0, Math.PI, 0, true)
        ctx2d.arc(ptf.X + wdht / 6.0, ptf.Y, wdht / 6.0, Math.PI, 0, true)
        ctx2d.arc(ptf.X + wdht / 6.0, ptf.Y, wdht / 6.0, 0, Math.PI, true)
        ctx2d.stroke()
        break
      case 6:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.stroke()
        break
      case 7:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.moveTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X, xy.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, xy.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y)
        ctx2d.fill()
        break
      case 8:
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, -Math.PI / 2 + Math.PI / 12, Math.PI / 6, true)
        ctx2d.arc(ptf.X, ptf.Y, wdht / 6.0, -Math.PI / 6, Math.PI / 6, true)
        ctx2d.arc(ptf.X, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 6, Math.PI / 2 - Math.PI / 12, true)
        ctx2d.stroke()
        break
      case 9:
      case 30:
      case 31:
      case 32:
      case 33:
      case 34:
      case 35:
        ctx2d.arc(ptf.X - wdht / 6.0, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI / 2, true)
        ctx2d.arc(ptf.X - wdht / 6.0, ptf.Y + wdht / 6.0, wdht / 6.0, -Math.PI / 2, Math.PI, false)
        ctx2d.moveTo(xy.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.fill()
        break
      case 10:
      case 11:
      case 12:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 12.0)
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 12.0)
        ctx2d.stroke()
        break
      case 28:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 6.0)
        ctx2d.stroke()
        break
      case 48:
      case 49:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 3.0)
        ctx2d.stroke()
        break
      case 56:
      case 57:
      case 66:
      case 67:
        ctx2d.arc(ptf.X - 5 * wdht / 24.0, ptf.Y, 5 * wdht / 24.0, Math.PI - Math.PI / 4, 0, false)
        ctx2d.arc(ptf.X + 5 * wdht / 24.0, ptf.Y, 5 * wdht / 24.0, Math.PI, -Math.PI / 4, true)
        ctx2d.stroke()
        break
      case 27:
      case 87:
      case 88:
      case 89:
      case 90:
        ctx2d.moveTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 3.0)
        ctx2d.fill()
        break
      case 13:
        ctx2d.moveTo(ptf.X + wdht / 4.0, xy.Y)
        ctx2d.lineTo(ptf.X - wdht / 4.0, ptf.Y)
        ctx2d.lineTo(ptf.X + wdht / 4.0, xy.Y + wdht)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0.X = ptf.X + wdht / 4.0
        ptf0.Y = xy.Y + wdht
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 4.0)
        ctx2d.lineTo(ptf0.X - wdht / 4.0, ptf0.Y)
        ctx2d.fill()
        break
      case 17:
      case 29:
        ctx2d.moveTo(xy.X, xy.Y)
        ctx2d.lineTo(xy.X + wdht, xy.Y)
        ctx2d.lineTo(ptf.X, ptf.Y)
        ctx2d.lineTo(xy.X + wdht, xy.Y + wdht)
        ctx2d.moveTo(xy.X + wdht / 4.0, xy.Y)
        ctx2d.lineTo(xy.X + wdht / 4.0, xy.Y + wdht)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0.X = xy.X + wdht
        ptf0.Y = xy.Y + wdht
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 4.0)
        ctx2d.lineTo(ptf0.X - wdht / 4.0, ptf0.Y)
        ctx2d.fill()
        break
      case 18:
        ctx2d.moveTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, ptf.Y - wdht / 3.0)
        ctx2d.lineTo(ptf.X, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        break
      case 19:
        ctx2d.moveTo(ptf.X - wdht / 12.0 - wdht / 6.0, ptf.Y - wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0 - wdht / 6.0, ptf.Y + wdht * 3 / 8.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 + wdht / 6.0, ptf.Y - wdht * 3 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y + wdht * 2 / 8.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0 + wdht / 6.0, ptf.Y + wdht * 3 / 8.0)
        ctx2d.stroke()
        break
      case 20:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 58:
      case 59:
        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y + wdht / 3.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, ptf.Y - wdht / 6.0, wdht / 6.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 25:
      case 80:
      case 81:
      case 82:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, xy.Y + wdht / 6.0, wdht / 6.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 14:
      case 15:
      case 16:
      case 21:
      case 24:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
        ctx2d.arc(ptf.X, ptf.Y, wdht / 6.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 23:
      case 68:
      case 69:
        ctx2d.moveTo(ptf.X - wdht / 3.0, xy.Y + wdht * 3 / 4.0)
        ctx2d.lineTo(ptf.X + wdht / 3.0, xy.Y + wdht * 3 / 4.0)

        ctx2d.moveTo(ptf.X - wdht / 4.0, xy.Y + wdht / 2.0)
        ctx2d.lineTo(ptf.X + wdht / 4.0, xy.Y + wdht)

        ctx2d.moveTo(ptf.X - wdht / 4.0, xy.Y + wdht)
        ctx2d.lineTo(ptf.X + wdht / 4.0, xy.Y + wdht / 2.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X, xy.Y + wdht / 3.0, wdht / 6.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 26:
      case 83:
      case 84:
      case 85:
      case 86:
        ctx2d.moveTo(ptf.X - wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht / 6.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0, xy.Y)
        ctx2d.lineTo(ptf.X + wdht / 12.0, xy.Y + wdht / 3.0)

        ctx2d.moveTo(ptf.X - wdht / 12.0, xy.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, xy.Y)

        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y)
        ctx2d.stroke()
        break
      case 22:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
        ctx2d.moveTo(ptf.X - wdht / 6.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, ptf.Y + wdht / 4.0)

        ctx2d.moveTo(ptf.X + wdht / 3.0, ptf.Y)
        ctx2d.lineTo(ptf.X - wdht / 3.0, ptf.Y)

        ctx2d.moveTo(ptf.X + wdht / 6.0, ptf.Y - wdht / 4.0)
        ctx2d.lineTo(ptf.X - wdht / 6.0, ptf.Y + wdht / 4.0)
        ctx2d.stroke()
        break
      case 36:
      case 37:
        ctx2d.moveTo(xy.X, ptf.Y)
        ctx2d.lineTo(xy.X + wdht, ptf.Y)

        ctx2d.moveTo(ptf.X, xy.Y)
        ctx2d.lineTo(ptf.X, xy.Y + wdht)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X, xy.Y + wdht)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht - wdht / 6.0)
        ctx2d.fill()
        break
      case 38:
      case 39:
        ctx2d.moveTo(xy.X, ptf.Y)
        ctx2d.lineTo(xy.X + wdht, ptf.Y)

        ctx2d.moveTo(ptf.X, xy.Y)
        ctx2d.lineTo(ptf.X, xy.Y + wdht)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(xy.X + wdht, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 6.0, ptf.Y + wdht / 6.0)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.moveTo(ptf.X - wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X, xy.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.fill()
        break
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 97:
        ctx2d.moveTo(xy.X + wdht / 8.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 8.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht * 3 / 8.0, ptf.Y + wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 8.0, xy.Y + wdht)
        ctx2d.moveTo(xy.X + wdht * 3 / 8, ptf.Y)
        ctx2d.lineTo(xy.X + wdht * 3 / 8, xy.Y + wdht)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0.X = xy.X + wdht - wdht / 8.0
        ptf0.Y = xy.Y + wdht
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 4.0)
        ctx2d.lineTo(ptf0.X - wdht / 4.0, ptf0.Y)
        ctx2d.fill()
        ctx2d.closePath()
        ctx2d.beginPath()
        ctx2d.arc(ptf.X + wdht / 12.0, ptf.Y - wdht / 3.0, wdht / 6.0, 0, Math.PI * 2, false)
        ctx2d.fill()
        break
      case 96:
      case 99:
        ctx2d.moveTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 2.0)
        ctx2d.lineTo(ptf.X - wdht / 12.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 4.0, ptf.Y - wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0, ptf.Y - wdht / 2.0)
        ctx2d.moveTo(xy.X + wdht / 8.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht / 8.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht * 3 / 8.0, ptf.Y + wdht / 4.0)
        ctx2d.lineTo(xy.X + wdht - wdht / 8.0, xy.Y + wdht)
        ctx2d.moveTo(xy.X + wdht * 3 / 8, ptf.Y)
        ctx2d.lineTo(xy.X + wdht * 3 / 8, xy.Y + wdht)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0.X = xy.X + wdht - wdht / 8.0
        ptf0.Y = xy.Y + wdht
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 4.0)
        ctx2d.lineTo(ptf0.X - wdht / 4.0, ptf0.Y)
        ctx2d.fill()
        break
      case 98:
        ctx2d.arc(ptf.X + wdht / 12.0, ptf.Y - wdht * 5 / 12.0 - wdht / 8.0, wdht / 8.0, 0, Math.PI, true)
        ctx2d.arc(ptf.X + wdht / 12.0, ptf.Y - wdht * 5 / 12.0 + wdht / 8.0, wdht / 8.0, -Math.PI / 2, Math.PI, false)

        ctx2d.moveTo(ptf.X + wdht / 12.0 - wdht / 3.0, ptf.Y - wdht * 5 / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0 + wdht / 3.0, ptf.Y - wdht * 5 / 12.0)

        ctx2d.moveTo(ptf.X + wdht / 12.0 + wdht / 3.0 + wdht / 6.0, ptf.Y - wdht * 5 / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0 + wdht / 3.0, ptf.Y - wdht * 5 / 12.0 - wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0 + wdht / 3.0, ptf.Y - wdht * 5 / 12.0 + wdht / 12.0)
        ctx2d.lineTo(ptf.X + wdht / 12.0 + wdht / 3.0 + wdht / 6.0, ptf.Y - wdht * 5 / 12.0)

        ctx2d.moveTo(xy.X, ptf.Y)
        ctx2d.lineTo(xy.X + wdht, ptf.Y)
        ctx2d.lineTo(xy.X + wdht - wdht * 3 / 8.0, ptf.Y + wdht * 3 / 8.0)
        ctx2d.lineTo(xy.X + wdht, ptf.Y + wdht * 3 / 4.0)
        ctx2d.moveTo(xy.X + wdht / 4.0, ptf.Y)
        ctx2d.lineTo(xy.X + wdht / 4.0, ptf.Y + wdht * 3 / 4.0)
        ctx2d.stroke()
        ctx2d.closePath()
        ctx2d.beginPath()
        ptf0.X = xy.X + wdht
        ptf0.Y = ptf.Y + wdht * 3 / 4.0
        ctx2d.moveTo(ptf0.X, ptf0.Y)
        ctx2d.lineTo(ptf0.X, ptf0.Y - wdht / 4.0)
        ctx2d.lineTo(ptf0.X - wdht / 4.0, ptf0.Y)
        ctx2d.fill()
        break
      case 100:
        ctx2d.moveTo(ptf.X - wdht / 6.0, xy.Y + wdht)
        ctx2d.lineTo(ptf.X - wdht / 6.0, xy.Y)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y)
        ctx2d.moveTo(ptf.X - wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht / 6.0)
        ctx2d.moveTo(ptf.X - wdht / 6.0, xy.Y + wdht / 3.0)
        ctx2d.lineTo(ptf.X + wdht / 6.0, xy.Y + wdht / 3.0)
        ctx2d.stroke()
        break
    }
  }

}
