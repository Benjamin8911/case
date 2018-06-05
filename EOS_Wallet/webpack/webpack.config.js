const configDev = require('./webpack.config.dev')
const configPro = require('./webpack.config.pro')

const isDev = process.env.NODE_ENV === 'development'

module.exports = isDev ? configDev : configPro