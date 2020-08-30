const express = require('express')
const router = express.Router()


// 注册控制器
const RegController = require('../controller/res.Controller')
    // 登录控制器
const LoginController = require('../controller/loginController')

// 注册的显示视图 /admin/res
router.get('/res', (req, res) => {
    res.render('login/res')
})

// 定义登录的显示视图 /admin/login
router.get('/login', (req, res) => {
    res.render('login/log')
})


// 注册请求处理
router.post('/res', RegController.reg)

// 登录请求处理
router.post('/login', LoginController.login)


// 防用户翻墙 放在登录和注册的下方
router.use(LoginController.isLog)


// 后台首页的显示视图
router.get('/index', (req, res) => {
    res.render('home/index', { nickname: req.session.nick })
})

// 退出登录
router.get('/logout', LoginController.logOut)

module.exports = router