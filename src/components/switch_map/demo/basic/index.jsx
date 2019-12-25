import React from 'react'
import SwitchMap from '../index'
import {eventEnum} from "../../../../webMap/enum/event_enum";
import {mapTypeEnum} from "../../../../webMap/enum/map_type_enum";

const dataSource = {
  domId: 'mapContainer',
  initPostion: [118, 20, 10000000],
  is3D: false,
  isFly: false,
  mapType: mapTypeEnum[0].key,
  callback: myMap => {
    myMap.addEvent('com', eventEnum.LEFT_CLICK, res => {
      console.warn(res)
    })
  }
};

function SwitchMapBasic() {
  return <SwitchMap dataSource={dataSource}/>
}

export default SwitchMapBasic
