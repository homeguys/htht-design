import React from 'react'
import {createHash} from "../../../utils/utils";

class Legend extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 150,
      height: 200,
    }
    this.hash = createHash(6)
  }

  componentDidMount() {
    const c = document.querySelector(`.myLegend-${this.hash}`)
    const ctx = c.getContext("2d");

    const {dataSource} = this.props
    const {isHorizontal, isLableOnLine, title, value, valueMaxLength, color} = dataSource



    const titleLength = title.length// 标题字符数
    const colorLength = color.length// 颜色数量


    if (isHorizontal) {
      const xNum = colorLength + 1// X方向份数
      const yNum = 5.5// y方向份数
      const width = xNum * 20
      const height = yNum * 20

      const xStep = width / xNum
      const yStep = height / yNum

      let xS = xStep / 2
      let yS = yStep * 1.5
      // eslint-disable-next-line radix
      const titleFontSize = parseInt(xStep * (xNum - 1) / titleLength)
      // eslint-disable-next-line radix
      const valueFontSize = parseInt(xStep)

      this.setState({
        width,
        height,
      }, () => {
        ctx.font = `${titleFontSize}px Arial`;
        // ctx.textAlign='center'
        ctx.fillText(title, xS, yS);
        yS += (yStep / 2)


        for (let i = 0; i < colorLength; i++) {
          ctx.fillStyle = color[i];
          ctx.fillRect(xS, yS, xStep, yStep * 1.5);
          xS += xStep

        }

        ctx.font = `${valueFontSize}px Arial`;
        if (isLableOnLine) {
          console.warn(1)
          xS = xStep * 1.25
          yS = yStep * 5
          for (let i = 0; i < value.length; i++) {
            ctx.fillText(value[i], xS, yS);
            xS += xStep
          }
        } else {
          xS = xStep * 0.5
          yS = yStep * 5
          for (let i = 0; i < value.length; i++) {
            ctx.fillText(value[i], xS, yS);
            xS += xStep
          }
        }
      })
    } else {
      const xNum = valueMaxLength + 3// X方向份数
      const yNum = colorLength + 2.5// y方向份数
      const width = xNum * 20
      const height = yNum * 20

      const xStep = width / xNum
      const yStep = height / yNum
      let xS = xStep / 2
      let yS = yStep * 1.5
      // eslint-disable-next-line radix
      const titleFontSize = parseInt(xStep * (xNum - 1) / titleLength)
      // eslint-disable-next-line radix
      const valueFontSize = parseInt(yStep)

      this.setState({
        width,
        height,
      }, () => {
        ctx.font = `${titleFontSize}px Arial`;
        ctx.fillText(title, xS, yS);
        yS += (yStep / 2)


        for (let i = 0; i < colorLength; i++) {
          ctx.fillStyle = color[i];
          ctx.fillRect(xS, yS, xStep * 1.5, yStep);
          yS += yStep

        }

        ctx.font = `${valueFontSize}px Arial`;
        if (isLableOnLine) {
          xS += (xStep * 2)
          yS = yStep * 3.5
          for (let i = 0; i < value.length; i++) {
            ctx.fillText(value[i], xS, yS);
            yS += yStep
          }
        } else {

          xS += (xStep * 2)
          yS = yStep * 3
          for (let i = 0; i < value.length; i++) {
            ctx.fillText(value[i], xS, yS);
            yS += yStep
          }
        }
      })
    }
  }


  render() {
    const {width, height} = this.state;
    return (
      <div className="htht-legend">
        <canvas className={`myLegend-${this.hash}`} width={width} height={height}
                style={{"border": "1px solid #000000"}}/>
      </div>
    )
  }
}

export default Legend
