import React from 'react'
import {Button} from 'antd'
import axios from 'axios'
import NjHTMap from "../../../webMap/NjHTMap"

const ButtonGroup = Button.Group

class Flow extends React.Component {
  constructor() {
    super();
    this.myMap = ""

  }

  componentDidMount() {
    const {dataSource} = this.props
    this.myMap = new NjHTMap(dataSource)
  }

  flow = () => {
    axios.get('./data/flow.json').then(res => {
      this.myMap.flow('myFlow', res.data, 1)
    })
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    return (
      <div className="htht-flow">
        <div className='bans'>
          <ButtonGroup>
            <Button onClick={this.flow}>流场</Button>
          </ButtonGroup>
        </div>
        <div id="mapContainer" style={style}/>
      </div>
    )
  }
}

export default Flow
