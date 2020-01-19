```jsx
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
```

---

```jsx
import React from 'react'
import { IconFont } from '../../../../utils/utils'
import Toolbar from '../index'

const dataSource = [
  { name: '放大', value: 'zoomOut', icon: <IconFont type="icon-zoomIn" /> },
  { name: '缩小', value: 'zoomIn', icon: <IconFont type="icon-zoomOut" /> },
  { name: '恢复', value: 'recover', icon: <IconFont type="icon-recover" /> },
  { name: '探针', value: 'probe', icon: <IconFont type="icon-iconset0393" /> },
  {
    name: '工具栏',
    icon: <IconFont type="icon-1" />,
    children: [
      { name: '测距离', value: 'distance' },
      { name: '测面积', value: 'area' },
      { name: '清除', value: 'clear' }
    ]
  },
  { name: '透明度', icon: <IconFont type="icon-toumingdu" /> },
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

function ToolbarNoRegion() {
  return <Toolbar dataSource={dataSource} position="left" />
}

export default ToolbarNoRegion
```

---

```jsx
import React from 'react'
import { IconFont } from '../../../../utils/utils'
import Toolbar from '../index'

const dataSource = [
  { name: '放大', value: 'zoomOut', icon: <IconFont type="icon-zoomIn" /> },
  { name: '缩小', value: 'zoomIn', icon: <IconFont type="icon-zoomOut" /> },
  { name: '恢复', value: 'recover', icon: <IconFont type="icon-recover" /> },
  { name: '探针', value: 'probe', icon: <IconFont type="icon-iconset0393" /> },
  {
    name: '工具栏',
    icon: <IconFont type="icon-1" />,
    children: [
      { name: '测距离', value: 'distance' },
      { name: '测面积', value: 'area' },
      { name: '清除', value: 'clear' }
    ]
  },
  { name: '透明度', icon: <IconFont type="icon-toumingdu" /> },
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

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]

function ToolbarDemo() {
  return <Toolbar dataSource={dataSource} options={options} hasRegion position="left" />
}

export default ToolbarDemo
```
