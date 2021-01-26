module.exports = {
  devServer: {
    proxy: {
      [process.env.VUE_APP_HTTPURL]: {
        target: `https://www.dongmanbu.cn/api/dmb`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          [process.env.VUE_APP_HTTPURL]: ''
        }
      },
    },
    open: true
  }
}
