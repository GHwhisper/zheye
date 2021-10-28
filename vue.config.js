'use strict'

module.exports = {
  devServer: {
    proxy: {
      [process.env.Vue_APP_BASE_API]: {
        // target: 'http://apis.imooc.com/api', // 该接口需要 icode
        target: 'http://api.vikingship.xyz/api', // 测试接口
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.Vue_APP_BASE_API]: ''
        }
      }
    }
  }
}
