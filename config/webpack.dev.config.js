let path = require('path')
let fs = require('fs')
let portfinder = require('portfinder')
let HtmlWebpackPlugin = require('html-webpack-plugin') //
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
let htmlPugins = []
let htmlNames = []
let srcResources = fs.readdirSync(path.resolve(__dirname, '..', 'src'))
for (let html of srcResources) {
  if (html.includes('.html')) {
    htmlNames.push(html)
    htmlPugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', `src/${html}`),
        filename: html, //目标html文件
        inject: 'head',
      })
    )
  }
}
// 获取本机电脑IP
function getIPAdress() {
  let interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

let config = {
  mode: 'development', // development 开发  production 生产
  entry: {
    main: './src/main.js',
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src'),
    },
  },
  devServer: {
    // port, //端口号
    overlay: true,
    host: '0.0.0.0', //用于局域网访问
  },
  stats: 'errors-only',
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
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
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
    ],
  },
  plugins: [...htmlPugins],
}

module.exports = new Promise((resolve, reject) => {
  portfinder.getPort(
    {
      port: 3000,
      stopPort: 6999,
    },
    (err, port) => {
      if (err) {
        reject(err)
      } else {
        config.devServer.port = port
        config.plugins.push(
          new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
              messages: htmlNames.map((el) => {
                return `http://localhost:${port}/${el} 或 http://${getIPAdress()}:${port}/${el}`
              }),
            },
          })
        )
        resolve(config)
      }
    }
  )
})
