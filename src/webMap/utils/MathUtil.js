export const MathUtil = {

  /**
   * 经纬度坐标转换为屏幕坐标（经纬度投影）
   * @param lon
   * @param lat
   * @param width
   * @param height
   * @param xStart
   * @param yStart
   * @param xEnd
   * @param yEnd
   * @returns {{X: number, Y: number}}
   * @constructor
   */
  WorldToScreen: function (lon, lat, width, height, xStart, yStart, xEnd, yEnd) {
    return {
      X: (lon - xStart) * width / (xEnd - xStart),
      Y: (yEnd - lat) * height / (yEnd - yStart)
    }
  },

  /**
   * 检测两个矩形是否相交
   * @param bound1 结构{LonS: number, LonE: number, LatS: number, LatE: number}
   * @param bound2 结构{LonS: number, LonE: number, LatS: number, LatE: number}
   * @returns {boolean}
   * @constructor
   */
  IsRectangleInter: function (bound1, bound2) {
    var lonS1 = bound1.LonS,
      lonEnd1 = bound1.LonE,
      latS1 = bound1.LatS,
      latEnd1 = bound1.LatE

    var lonS2 = bound2.LonS,
      lonEnd2 = bound2.LonE,
      latS2 = bound2.LatS,
      latEnd2 = bound2.LatE

    if (lonEnd1 < lonS2 || lonEnd2 < lonS1 || latEnd1 < latS2 || latEnd2 < latS1) {
      return false
    } else {
      return true
    }
  },

  /**
   * 获取两个多边形的交集
   * @param bound1 结构{LonS: number, LonE: number, LatS: number, LatE: number}
   * @param bound2 结构{LonS: number, LonE: number, LatS: number, LatE: number}
   * @returns {{LonS: number, LonE: number, LatS: number, LatE: number}}
   * @constructor
   */
  GetRectangleInter: function (bound1, bound2) {
    if (!MathUtil.IsRectangleInter(bound1, bound2)) {
      return null
    }

    var lonS1 = bound1.LonS,
      lonEnd1 = bound1.LonE,
      latS1 = bound1.LatS,
      latEnd1 = bound1.LatE

    var lonS2 = bound2.LonS,
      lonEnd2 = bound2.LonE,
      latS2 = bound2.LatS,
      latEnd2 = bound2.LatE

    return {
      LonS: (lonS1 < lonS2) ? lonS2 : lonS1,
      LonE: (lonEnd1 < lonEnd2) ? lonEnd1 : lonEnd2,
      LatS: (latS1 < latS2) ? latS2 : latS1,
      LatE: (latEnd1 < latEnd2) ? latEnd1 : latEnd2
    }
  },

  /**
   * 获取位置1到位置2的方向角 正北0度 顺时针
   * @param pt1
   * @param pt2
   * @param isAngle true-返回角度 false-返回弧度
   * @returns {number}
   */
  GetAngle: function (pt1, pt2, isAngle) {
    var td = 0.001,
      lon1 = pt1[0],
      lat1 = pt1[1],
      lon2 = pt2[0],
      lat2 = pt2[1],
      angle = 0

    if (Math.abs(lat1 - lat2) < td) {
      if (lon2 >= lon1) {
        angle = Math.PI / 2
      } else {
        angle = 3 * Math.PI / 2
      }
    } else {
      angle = Math.atan2(Math.abs(lon1 - lon2), Math.abs(lat1 - lat2))
      if (lon2 >= lon1) {
        if (lat2 < lat1) {
          angle = Math.PI - angle
        }
      } else {
        if (lat2 >= lat1) {
          angle = 2 * Math.PI - angle
        } else {
          angle = Math.PI + angle
        }
      }
    }

    if (isAngle) {
      return angle * 180 / Math.PI
    } else {
      return angle
    }
  },

  /**
   * 计算地球两点间的距离
   * @param lon1
   * @param lat1
   * @param lon2
   * @param lat2
   * @param isRadian true-返回弧度 false-返回km
   * @returns {number}
   */
  GetDis: function (lon1, lat1, lon2, lat2, isRadian) {
    lat1 = lat1 * Math.PI / 180.0
    lat2 = lat2 * Math.PI / 180.0

    var b = lon1 * Math.PI / 180.0 - lon2 * Math.PI / 180.0
    var radian = Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(b) + Math.sin(lat1) * Math.sin(lat2))

    if (isRadian) {
      return radian
    } else {
      return radian * 6378.137
    }
  },

  /**
   * 计算地球上区域面积 仅适用于凸多边形
   * @param targetArea 区域点集合 [[0,1]]结构 0-X方向 1-Y方向
   * @returns {number} km²
   */
  GetArea: function (targetArea) {
    if (targetArea.length < 3) {
      return 0
    }
    var sumArea = 0,
      p1 = targetArea[0],
      p2, p3, area,
      size = targetArea.length - 1
    for (var i = 1; i < size; i++) {
      p2 = targetArea[i]
      p3 = targetArea[i + 1]
      area = MathUtil.GetAreaP3(p1, p2, p3)
      if (!isNaN(area)) {
        sumArea += area
      }
    }

    return sumArea
  },

  /**
   * 计算地球上三个位置点面积
   * @param p1 [0,1]结构 0-X方向 1-Y方向
   * @param p2 [0,1]结构 0-X方向 1-Y方向
   * @param p3 [0,1]结构 0-X方向 1-Y方向
   * @returns {number} km²
   * @constructor
   */
  GetAreaP3: function (p1, p2, p3) {
    var x1 = p1[0],
      y1 = p1[1],
      x2 = p2[0],
      y2 = p2[1],
      x3 = p3[0],
      y3 = p3[1]

    var a = MathUtil.GetDis(x1, y1, x2, y2, true)
    var b = MathUtil.GetDis(x1, y1, x3, y3, true)
    var c = MathUtil.GetDis(x2, y2, x3, y3, true)

    var ra = Math.acos((Math.cos(a) - Math.cos(b) * Math.cos(c)) / (Math.sin(b) * Math.sin(c)))
    var rb = Math.acos((Math.cos(b) - Math.cos(a) * Math.cos(c)) / (Math.sin(a) * Math.sin(c)))
    var rc = Math.acos((Math.cos(c) - Math.cos(a) * Math.cos(b)) / (Math.sin(a) * Math.sin(b)))

    return (ra + rb + rc - Math.PI) * 6378.137 * 6378.137
  },

  /**
   * 检测指定的位置点是否在指定闭合区域内
   * @param {number} x 待检测X方向位置点
   * @param {number} y 待检测Y方向位置点
   * @param targetArea 目标区域闭合点集 [[0,1]]结构 0-X方向 1-Y方向
   * @returns {boolean}
   */
  IsPtInArea: function (x, y, targetArea) {
    // 闭合区域至少四个位置点
    if (!targetArea || targetArea.length < 4) {
      return false
    }

    var size = targetArea.length - 1
    // 是否闭合区域
    if (targetArea[0][0] != targetArea[size][0] || targetArea[0][1] != targetArea[size][1]) {
      return false
    }

    var flag = false
    var x1, y1, x2, y2
    for (var i = 0; i < size; i++) {
      x1 = targetArea[i][0]
      y1 = targetArea[i][1]
      x2 = targetArea[i + 1][0]
      y2 = targetArea[i + 1][1]

      if (((y2 <= y && y < y1) || (y1 <= y && y < y2))
        && x < ((x1 - x2) * (y - y2) / (y1 - y2) + x2)) {
        flag = !flag
      }
    }

    return flag
  },

  /**
   * 根据UV获取风向风速
   * @param u
   * @param v
   * @returns {*[]}
   * @constructor
   */
  GetWindByUV: function (u, v) {

    var angle = 0
    if (Math.abs(v) < 0.001) {
      if (u >= 0) {
        angle = 270
      } else {
        angle = 90
      }
    } else {
      angle = Math.atan(Math.abs(u / v)) * 180 / Math.PI
      if (u >= 0) {
        if (v > 0) {
          angle = 180 + angle
        } else {
          angle = 360 - angle
        }
      } else {
        if (v > 0) {
          angle = 180 - angle
        }
      }
    }

    var speed = Math.sqrt(u * u + v * v)
    if (speed > 50) {
      speed = 50
    }
    return [angle, speed]
  },
}
