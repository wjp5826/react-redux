var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.dev');
var compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    publicPath: '/',
    hot: true,
    stats: {
        colors: true
    }
})
server.listen(3011)
