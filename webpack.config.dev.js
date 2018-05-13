var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
// 打开浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devtool: 'cheap-moudle-eval-source-map',
    entry: {
        app: './src/entry.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: '/',
        publicPath: '/',
        filename: '[name].[hash].js',
    },
    plugins : [
        new webpack.NamedModulesPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        // }),
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
            constants: path.resolve(__dirname, 'src/constants')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules | bower_components)/,
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
 