var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var webpackConfig = {
  entry: {
    aa: ['./src/js/pages/aa.js'],
    bb: ['./src/js/pages/bb.js'],
    index:['./src/index.js']
  },
  devServer:{
    contentBase: "./src",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,
    port:1100
  },
  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: 'js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css', {
      //allChunks: true
    }),
    new CommonsChunkPlugin({
        name: 'vendors',
        chunks: ['aa', 'bb','index'],
        // minChunks是指一个文件至少被require几次才会被放到CommonChunk里，如果minChunks等于2，说明一个文件至少被require两次才能放在CommonChunk里
        minChunks: 3 // 提取所有chunks共同依赖的模块    
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['vendors', 'aa'],
      filename: 'html/a.html',
      template: 'src/html/a.html',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['vendors', 'bb'],
      filename: 'html/b.html',
      template: 'src/html/b.html',
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      chunks: ['vendors','index'],
      filename: 'index.html',
      template: 'src/index.html',
      hash:true
    })
  ]
}

module.exports = webpackConfig;