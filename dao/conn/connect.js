// 建立数据库的连接
const mongoose = require('mongoose')
const { host, opts } = require('../../config/userConfig')

mongoose.connect(host, opts)

module.exports = mongoose