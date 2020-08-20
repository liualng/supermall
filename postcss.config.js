module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度
      viewportHeight: 667, //视窗的高度
      unitPrecison: 5, //转换后视窗的小数位数
      viewportUnit: 'vw',
      // 指定不需要转换的类
      selectorBalckList: ['ignore', 'tab-bar', 'tab-bar-item'],
      minPixelValue: 1, //小于或等于 1px的不转换
      mediaQuery: false, //允许媒体查询中装换 px
      exclude:[/TabBar/]
    }
  }
}
