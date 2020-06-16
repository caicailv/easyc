let path = require('path');
let fs = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');  //配置所有html文件可热更新而不是只有根目录下的index才可以
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const port = 3000;// 端口号
let htmlPugins = [];
let srcResources = fs.readdirSync(path.resolve(__dirname, "..", 'src/html'));
for (let html of srcResources) {
    html.includes('.html');
    htmlPugins.push(
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", `src/html/${html}`),//模板文件，即需要打包和拷贝到build目录下的html文件
            filename: html,//目标html文件
            inject: 'head'
        }));
}
module.exports = {
    mode: 'development',// development 开发  production 生产
    entry: {
        main: './src/main.js'
    },

    resolve: {
        alias: {
            '@': path.join(__dirname, "..", 'src'),
        },
    },
    devServer: {
        port,//端口号
        overlay: true
        // host: '192.168.2.102',//用于局域网访问
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
                        esModule: false
                    }
                },
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
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
                        }
                    },
                    'postcss-loader',
                    'sass-loader',

                ],
            },
        ]
    },
    plugins: [
        ...htmlPugins,
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`http://localhost:${port}`]
            }
        })
    ],

}