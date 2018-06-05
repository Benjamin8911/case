const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|ttf|eot)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /(\.js|\.vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [path.resolve(__dirname, 'src')], // 指定检查的目录
                options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                    formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        open: true,
        overlay: {
            errors: true
        }
    }
}

module.exports = config