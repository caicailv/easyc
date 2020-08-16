const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let htmlEntry = [];
let srcResources = fs.readdirSync(path.resolve(__dirname, '..', 'src'))
for (let html of srcResources) {
  if (html.includes('.html')) {
    htmlEntry.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', `src/${html}`), //模板文件，即需要打包和拷贝到build目录下的html文件
        filename: html, //目标html文件
        inject: 'head',
      })
    )
  }
}
module.exports = {
    mode: 'production',// development 开发  production 生产
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, "..", 'dist'),
        filename: 'js/[name].js',
    },
    stats: 'errors-only',
    resolve: {
        alias: {
            '@': path.join(__dirname, "..", 'src'),
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
                    }
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 100,
                            // remPrecision: 2 //精度 保留小数位数
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        ...htmlEntry,

        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                message: [path.resolve(__dirname, "..", 'dist')],
                notes: [`打包成功: ${path.resolve(__dirname, "..", 'dist')}`]
            },
        })
    ]

};