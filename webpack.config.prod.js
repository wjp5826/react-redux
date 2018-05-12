var path = require('path');
var webpack = require('webpack');
// 提取css到一个独立的文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 分析打的包
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 生成HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/entry',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
    publicPath: './build/',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      title: 'react-redux',
      filename: '/index.html',
      template: 'index.html',
      inject: 'body'
    }),
    new BundleAnalyzerPlugin(),
    // new UglifyJSPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules | bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: '[path][hash].[ext]',
            publicPath: 'build/',
          }
        }
      }
    ]
  }
}
