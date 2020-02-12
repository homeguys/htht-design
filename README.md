<p align="center">
  <a href="/">
    <img width="100" src="https://en.gravatar.com/userimage/178402859/af5b0008ab31001d58f0ca0a54835038.jpg">
  </a>
</p>

<h1 align="center">Htht Design</h1>

<div align="center">

南京航天宏图 UI 组件库

基于 react 实现的精致的 web 页面组件库，基于 antd design、echarts、cesiumJs 封装的组件库，便于直接使用。（测试阶段，预发布，暂不可用）

</div>

<p>
  文档地址：<a href="https://homeguys.github.io/htht-design">https://homeguys.github.io/htht-design</a>
</p>

## 📦 Install

```bash
npm install htht-design
```

```bash
yarn add htht-design
```

## 🔨 Usage

```jsx
import { Toolbar } from 'htht-design'
ReactDOM.render(<Toolbar />, mountNode)
```

## ✨ 按需引入 css

```bash
// .babelrc.js
[
  'import',
  {
    libraryName: 'htht-design',
    libraryDirectory: 'lib',
    camel2UnderlineComponentName: true,
    customName: name => {
      return `htht-design/lib/${name}/demo` // 核心配置 根据你自己的组件目录配置
    },
    style: true
  },
  'htht-design'
]
```

## 🖥 拷贝代码到本地运行:

```bash
$ git clone git@github.com:homeguys/htht-design.git
$ cd ant-design
$ npm install
$ npm start
```
