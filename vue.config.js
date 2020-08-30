module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
		open: true,
        proxy: {
            '/':{
                target:'http://10.0.0.24:8082',
                changeOrigin:true,
                pathRewrite:{
                    '^/':'/'
                }
            }
        }
    }
}