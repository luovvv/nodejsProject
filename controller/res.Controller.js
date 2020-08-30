// 引入用户的写入 这里是一个对象函数
const insertUser = require('../dao/model/userModel')

module.exports = {
    // 用户注册处理
    // 用户注册以后先停留在注册页 然后注册控制器进行处理
    async reg(req, res) {
        // console.log(req.body);
        // 这里写入返回的是一个promise

        try {
            let result = await insertUser.addUser(req.body)
                // 存入cookie
                // res.cookie.username = result.username
                // res.cookie.nickname = result.nickname
            res.cookie('username', result.username, { maxAge: 20 * 60 * 1000 })
            res.cookie('nickname', result.nickname, { maxAge: 20 * 60 * 1000 })

            //返回对象，注册成功 跳转首页面
            return res.render('home/index')
        } catch (error) {
            // 注册失败 继续注册
            return res.render('home/toRes')
        }

        // console.log(typeof(result));
        // if (typeof(result) == 'object') {
        //     // 存入cookie
        //     // res.cookie.username = result.username
        //     // res.cookie.nickname = result.nickname
        //     res.cookie('username', result.username, { maxAge: 20 * 60 * 1000 })
        //     res.cookie('nickname', result.nickname, { maxAge: 20 * 60 * 1000 })

        //     //返回对象，注册成功 跳转首页面
        //     return res.render('home/index')
        // } else {
        //      // 注册失败 继续注册 
        //      return res.render('login/res')

        // }

    }
}