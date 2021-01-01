const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://ec2-15-164-222-199.ap-northeast-2.compute.amazonaws.com",
      changeOrigin: true
    })
  )
}