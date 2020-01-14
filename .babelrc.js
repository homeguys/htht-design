module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: 'css'
      },
      'ant'
    ],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'lib',
        style: 'css'
      },
      'ant-mobile'
    ],
    [
      'import',
      {
        libraryName: 'htht-design',
        libraryDirectory: 'lib',
        camel2UnderlineComponentName: true,
        camel2DashComponentName: false,
        customName: name => {
          return `htht-design/lib/${name}` // 核心配置 根据你自己的组件目录配置
        },
        style: () => {
          return false
        }
      },
      'htht-design'
    ]
  ]
}
