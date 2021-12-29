const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
let htmlEntry = []
let srcResources = fs.readdirSync(path.resolve(__dirname, '..', 'src'))
for (let html of srcResources) {
  if (html.includes('.html')) {
    htmlEntry.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', `src/${html}`), //模板文件，即需要打包和拷贝到build目录下的html文件
        filename: html, //目标html文件
        inject: 'head',
        minify: {
          collapseWhitespace: false,
        },
      })
    )
  }
}

// 直接使用copywebpackplugin会在img目录为空时,抛出无法打包的错误,这里先判断是否有图片,再决定是否使用该插件
let copyWebpackPlugins = []
const imgs = fs.readdirSync(path.resolve(__dirname, '..', 'src/img'))
if (imgs.length !== 0) {
  copyWebpackPlugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/img'), //打包的静态资源目录地址
          to: path.resolve(__dirname, '../dist/img'), //打包到dist下面的public
        },
      ],
    })
  )
}
module.exports = {
  performance: {
    hints: false,
  },
  mode: 'production', // development 开发  production 生产
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/[name].js',
  },
  stats: 'errors-only',
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]',
            limit: 0,
            esModule: false,
          },
        },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 100,
              // remPrecision: 2 //精度 保留小数位数
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    ...htmlEntry,
    ...copyWebpackPlugins,
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        message: [path.resolve(__dirname, '..', 'dist')],
        notes: [`打包成功: ${path.resolve(__dirname, '..', 'dist')}`],
      },
    }),
  ],
}
