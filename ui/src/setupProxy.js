const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  var apiPathRewrite = {}
  apiPathRewrite['^' + process.env.REACT_APP_API_PATH] = ''

  app.use(
    process.env.REACT_APP_API_PATH,
    proxy({
      target: process.env.REACT_APP_API_HOST,
      changeOrigin: true,
      pathRewrite: apiPathRewrite,
      xfwd: true
    })
  );
};
