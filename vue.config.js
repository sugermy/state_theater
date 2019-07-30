module.exports = {
  devServer: {
    port: 8081,
    open: true, //配置自动启动浏览器
    proxy: {
      // '/api': {
      //   target: 'http://api.douban.com/v2/',
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    }
  }
};
