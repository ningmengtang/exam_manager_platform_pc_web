module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
		open: true,
        proxy: {
            '/':{
                target:'http://10.0.0.12:8082',
                changeOrigin:true,
                pathRewrite:{
                    '^/':'/'
                }
            }
        }
    }
}