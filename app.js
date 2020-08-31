// 服务器搭建
const express = require('express')
const app = express();
app.listen(8080)
const path = require('path')
    // 引入body-parser
const bodyParser = require('body-parser')

//设置cookieSession
const cookieSession = require('cookie-session')
app.use(cookieSession({
    // 指定cookie中的标识的名称
    name: 'sessionId',
    // salt 加密字符串  混淆字符串
    secret: 'afewklfjewklfjlwfjewlfjewlfjwelfjlw!Wer3wr#%$#%#@efwfjewfjwel',
    // 设置session过期时间 单位 毫秒 
    maxAge: 24 * 60 * 60 * 1000
}))

// 引入cookie-parser
const cookieParser = require('cookie-parser')
    // 中间件引入
app.use(cookieParser())


// 静态资源 public文件夹下
app.use(express.static('public'))

// post接受处理
app.use(bodyParser.urlencoded({ extended: false }))


// 引入模板引擎
const expArtTemplate = require('express-art-template');
const { nextTick } = require('process');
// 设置读取路径
const filepath = path.join(__dirname, 'views')
app.engine('html', expArtTemplate)
app.set('views', filepath)
app.set('view engine', 'html')



app.use('/admin', require('./routers/admin'))

// 404
app.use((req, res, next) => {
    res.render('home/404')
})