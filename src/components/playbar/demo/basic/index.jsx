import React from 'react'
import { IconFont } from '../../../../utils/utils'
import Toolbar from '../index'

const dataSource = [
  { name: '放大', value: 'zoomOut', icon: <IconFont type="icon-zoomIn" /> },
  { name: '缩小', value: 'zoomIn', icon: <IconFont type="icon-zoomOut" /> },
  { name: '恢复', value: 'recover', icon: <IconFont type="icon-recover" /> },
  {
    name: '图层',
    icon: <IconFont type="icon-layer" />,
    children: [
      { name: '影像图', value: 'st' },
      { name: '交通图', value: 'road' },
      { name: '地形图', value: 'terrain' }
    ]
  }
]

function ToolbarBasic() {
  return <Toolbar dataSource={dataSource} />
}

export default ToolbarBasic
