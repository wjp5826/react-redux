var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: '/',
        publicPath: '/',
        filename: '[name].[hash].js',
    },
    plugins : [
        new HtmlWebpackPlugin({
            title: 'react-redux',
            filename: '/index.html',
            template: 'index.html',
            inject: 'body'
        }),
    ],
    module: {
        rules: [
            {
                exclude: [/\.js$/,/\.html$/,/\.json$/],
                loader: 'file-loader',
                options: {
                    name: 'static/[name].[hash:8].[ext]'
                }
            },
            {
                test: [/\.bmp$/,/\.gif$/,/\.jpe?g$/,/\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules | bower_components)/,
                use: 'babel-loader'
            },{
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },{
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit:10000,
                            name: ['files/[md5:hash:base64:10].[ext]']
                        }
                    }
                ]
            },{
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
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
 