const { model } = require('../conn/connect')
const userSchema = require('../schema/userSchema')


class userModle {
    constructor() {
        // 类成员实例
        this.model = model('Userdata', userSchema)
    }

    // 用户注册
    addUser({
        username,
        psw,
        nickname,
        telnum,
        email,
        hobbies = [],
        info = '',
        // 注册时，默认登录次数为0
        logCount = 0
    }) {
        return this.model.insertMany({
            username,
            psw,
            nickname,
            telnum,
            email,
            info,
            hobbies,
            logCount
        })
    }

    // 查询数据库 判断用户和密码是否正确
    checkUser({ username, psw }) {
        return this.model.findOne({ username, psw })
    }

    // 判断用户名是否存在
    checkUsername(username) {
        return this.model.findOne({ username })
    }

    // 置零logCount
    updateCount(username) {
        return this.model.updateOne({ username }, { $set: { "logCount": '0' } })
    }

}

module.exports = new userModle