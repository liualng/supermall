module.exports = {
  configureWebpack:{
    resolve:{
      // 别名
      alias:{
        "assets":"@/assets",
        "common":"@/common",
        "network":"@/network",
        "components":"@/components",
        "views":"@/views"
      }
    }
  }
}