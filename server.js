var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    publicPath: '/',
    historyApiFallback: true,
    host: 'localhost',
    hotOnly: true,
    inline: true,
    open: true,
    overlay: true,
    noInfo: true,
    hot: true,
    compress: true,
    stats: "minimal",
});
server.listen(3011, 'localhost', function(error){
    console.log(`start server by 3011`)
});
