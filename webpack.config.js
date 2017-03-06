//引入需要的模块
const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



const config = {
  devtool: 'eval',
  //入口文件
  entry: {
    play: './src/play/index.js',//单个文件入口
    list: './src/list/list.js',
    commons: ['jquery']//公共文件
  },
  //编译后输出文件
  output: {
    path: path.resolve(__dirname, 'dist'),//输出文件夹
    filename: '[name]-[hash:8].js'//输出文件名
  },
  //本地服务器配置
  devServer: {
    contentBase: path.join(__dirname, "dist"),//基础引用地址
    compress: true,//使用gzip压缩
    port: 8080,//端口号
    host:"0.0.0.0",//允许外部访问（然而我为什么访问不了。）
    // contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
    //多个文件夹配置方式
    // headers:{"FrosV":"FUOK♂YOU"}
    hot: true//热处理
  },
  //模块化
  module: {
    rules: [{//读取规则
      test: /\.(js|jsx)$/,//匹配js
      use: 'babel-loader'//使用babel编译
    }, {
      test: /\.css$/,//匹配css
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
  //插件
  plugins: [
    new HtmlWebpackPlugin({//html注入文件插件
      filename: 'play.html',//文件名
      template: './src/play/play.html',//渲染模板
      chunks: ['play', 'commons'],//原型
      inject: 'body'//？？？
    }),
    new HtmlWebpackPlugin({
      filename: 'list.html',
      template: './src/list/list.html',
      chunks: ['list', 'commons'],
      inject: 'body'
    }),
    new ExtractTextWebpackPlugin('styles.css'),//css渲染模板
    new webpack.ProvidePlugin({//？？？
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
      lodash: 'lodash'
    })
  ]
}

module.exports = config;
