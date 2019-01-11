const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, '../src') // __dirname 中的src目录，以此类推
const APP_FILE = path.resolve(APP_PATH, 'index.js') // 根目录文件app.jsx地址
const BUILD_PATH = path.resolve(ROOT_PATH, '../dist') // 发布文件所存放的目录

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: {
    app: [APP_FILE]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
                // require('cssnano')()
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:8]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
                // require('cssnano')()
              ]
            }
          },
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.(eot|woff|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=1200&name=[hash].[ext]'
      },
      {
        test: /\.(svg)(\?|$)/,
        loader: 'svg-sprite-loader?' + JSON.stringify({
          name: '[name]',
          prefixize: true,
        })
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, '../src/index.html'),
      filename: '../dist/index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'), // 静态文件根目录
    host: 'localhost',
    port: '3006',
    open: true,
    hot:true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //模块匹配相应的后缀，确认文件
    alias: {
      '@': `${APP_PATH}/`,
    },
    modules: [
      'node_modules',
      'src',
    ]
  }
}