const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); // 打开浏览器
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.exports = {
    mode: 'development', // 开发模式，默认设置环境变量
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
        new HtmlWebpackPlugin({
            title: 'react-redux',
            filename: '/index.html',
            template: 'index.html',
            inject: 'body'
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:3011' }),
        new webpack.HotModuleReplacementPlugin(),
        // Prepack 就是一个部分求值器，编译代码时提前将计算结果放到编译后的代码中，而不是在代码运行时才去求值。
        // new PrepackWebpackPlugin(),
         // 开启 Scope Hoisting
        new ModuleConcatenationPlugin(),
    ],
    resolve: {
        alias: {
            constants: path.resolve(__dirname, 'src/constants'),
            react: path.resolve(__dirname, './node_modules/react/umd/react.development.js')
        },
        modules: [path.resolve(__dirname, 'node_modules')], // 只从node_modules去寻找第三方
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    // 文件监听配置，不监听 node_modules的文件
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
 