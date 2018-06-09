var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
// 打开浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-moudle-eval-source-map',
    entry: {
        app: ['webpack-dev-server/client?http://localhost:3011/', 'webpack/hot/dev-server','./src/entry.js'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: '/',
        publicPath: '/',
        chunkFilename: '[name].bundle.js',
        filename: '[name].[hash].js',
    },
    plugins : [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'react-redux',
            filename: '/index.html',
            template: 'index.html',
            inject: 'body'
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:3011' }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            constants: path.resolve(__dirname, 'src/constants'),
            react: path.resolve(__dirname, './node_modules/react/umd/react.development.js')
        },
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: path.resolve(__dirname, 'src'),
                use: "babel-loader"
            },
            {
                test: /\.(less|css)$/,
                exclude: /(node_modules | bower_components)/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit:10000,
                            name: '[md5:hash:base64:10].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { importLoaders: 1, modules: true, localIdentName: '[path][name]_[local]--[hash:base64:5]' } },
                    { 
                        loader: 'postcss-loader',
                        options : {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browser: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9'
                                    ],
                                    flexbox: 'no-2009',
                                }),
                                pxtorem({ rootValue: 100, propWhiteList: [] }),
                            ]
                        }
                    }
                ]
            }
        ]
    }
}
 