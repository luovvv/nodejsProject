const { model } = require('../conn/connect')
const logSchema = require('../schema/logSchema')


class logModel {
    constructor() {
        // 类成员实例
        this.model = model('Login_log', logSchema)
    }

    // 登录日志
    addLog({ logUsername, logIp, logTime, logBrownser, logUrl }) {
        // 日志需要记录的内容 : 用户名 请求时间 请求的url 请求的浏览器型号 请求的ip
        return this.model.insertMany({
            logUsername,
            logIp,
            logTime,
            logBrownser,
            logUrl
        })
    }
}
// 导出实例对象
module.exports = new logModel