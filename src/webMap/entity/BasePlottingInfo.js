export default class BasePlottingInfo {
  constructor ({id, name, position, dataInfo}) {
    this.id = id
    this.name = name
    this.position = {
      altitude: position[2] ? position[2] : 0,
      latitude: position[1],
      longitude: position[0]
    }
    this.dataInfo = {
      INVALID_VALUE: dataInfo.INVALID_VALUE ? dataInfo.INVALID_VALUE : 99999,
      WG1: dataInfo.WG1,
      VV: dataInfo.VV,
      WW: dataInfo.WW,
      OP: dataInfo.OP,
      P3: dataInfo.P3,
      WG2: dataInfo.WG2,
      R6: dataInfo.R6,
      CH: dataInfo.CH,
      H: dataInfo.H,
      CL: dataInfo.CL,
      CM: dataInfo.CM,
      WD: dataInfo.WD,
      N: dataInfo.N,
      DP24: dataInfo.DP24,
      TD: dataInfo.TD,
      DT24: dataInfo.DT24,
      AT: dataInfo.AT,
      NH: dataInfo.NH,
      WS: dataInfo.WS,
      PS: dataInfo.PS,
    }
  }

}
