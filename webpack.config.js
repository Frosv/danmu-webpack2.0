const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



const config = {
  devtool: 'eval',
  entry: {
    play: './src/play/index.js',
    list: './src/list/list.js',
    commons: ['jquery']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash:8].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),//基础引用地址
    compress: true,//使用gzip压缩
    port: 8080,//端口号
    host:"0.0.0.0",//允许外部访问（然而我为什么访问不了。）
    // contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
    //多个文件夹配置方式
    // headers:{"FrosV":"FUOK♂YOU"}
    hot: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      use: 'url-loader'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: 'file-loader'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'play.html',
      template: './src/play/play.html',
      chunks: ['play', 'commons'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'list.html',
      template: './src/list/list.html',
      chunks: ['list', 'commons'],
      inject: 'body'
    }),
    new ExtractTextWebpackPlugin('styles.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
      lodash: 'lodash'
    })
  ]
}

module.exports = config;
