module.exports = {
    configureWebpack:{
        externals:{
            echarts: 'echarts',
            html2canvas:'html2canvas',
            jspdf:'jspdf'
        },
    },
    productionSourceMap:false,
    lintOnSave:false
}