// 登录控制器
// 需求：验证用户名和密码
//        判断有没有session

// 增删改查的方法都可以定义在model中。
const userModel = require('../dao/model/userModel')

// 登录的日志记录
const logModel = require('../dao/model/logModel')


// 导入时间中间键 timer是一个函数 返回值为：${y}-${m}-${d}
const timer = require('../middleware/data')

module.exports = {
    // 登录后
    async login(req, res, next) {
        // 每一次登录都要检查一下是否有限制
        console.log(req.session.limit, req.session.username);
        console.log(req.cookies);
        if (req.session.limit == 1 && req.session.username == req.body.username) {
            //用户名已错误登录三次 跳转到提示页
            return res.render('home/toLogin', { msg: "您的密码已错误三次，请在24小时后重新登录" })
        }

        // userModel.checkUser(req.body) 返回一个promise对象
        let result = await userModel.checkUser(req.body)
        if (result) {
            // 登录成功 将logcount置为0
            console.log(req.body.username);
            let a = await userModel.updateCount(req.body.username)
            console.log(a);
            // // 存入cookie
            res.cookie('username', result.username, { maxAge: 20 * 60 * 1000 })
            res.cookie('nickname', result.nickname, { maxAge: 20 * 60 * 1000 })

            // req.session.username = result.username;
            // req.session.nickname = result.nickname
            // 记录日志：
            logModel.addLog({
                    logUsername: result.username,
                    logIp: req.ip,
                    logTime: timer(),
                    logBrownser: req.headers['user-agent'],
                    logUrl: req.url
                })
                // 不为空 读取到数据，跳转到msg页面
            return res.render('home/msg', { msg: '登陆成功' })
        } else {
            // 登录失败
            let failResult = await userModel.checkUsername(req.body.username)
            if (failResult) {
                // 判断是否有用户名  用户名存在 而密码错误.
                if (failResult.logCount === 3) {
                    // 设置session 有效时间为24小时
                    req.session['username'] = failResult.username;
                    req.session['limit'] = 1;
                    console.log(req.session.limit, req.session.username);

                } else {
                    //  用户登录密码错误小于三次  让logCount自增1 继续登录
                    let dd = await userModel.model.updateOne({ 'username': failResult.username }, { $inc: { 'logCount': 1 } })
                    return res.render('login/log')
                }

            } else {
                // 用户名不存在
                return res.render('home/toLogin', { msg: "用户名不存在，请重新登录失败" })
            };
        }
    },

    // 退出登录
    logOut(req, res) {
        // req.session.username = null;
        // req.session.nickname = null

        res.cookie('username', null)
        res.cookie('nickname', null)
        return res.render('login/log')
    },



    // 判断用户是否登录 本地有无cookie
    isLog(req, res, next) {
        // 需要同时存在username和nick才是登录状态
        if (req.cookies.username == 'j:null' && req.cookies.nickname == 'j:null') {
            // 未登录 跳转到登录页
            res.render('login/log')
        } else {
            // 跳转到个人页
            next()
        }
    },

}