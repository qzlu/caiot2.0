module.exports = {
    configureWebpack:{
        externals:{
            echarts: 'echarts',
            html2canvas:'html2canvas',
            jspdf:'jspdf'
        },
    },
    devServer: {
        // development server port 8000
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        proxy: {
          '/api': {
            target: 'http://172.172.172.37:8770/',
/*             pathRewrite: {
                '^/api': '/'
            }, */
            ws: false,
            changeOrigin: true
          }
        }
    },
    productionSourceMap:false,
    lintOnSave:false
}