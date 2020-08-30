1.express搭建服务器
2.定义路由规范
    2.1 注意路由访问前缀
    2.2 不同页面和请求的路由
        登录页/个人后台页/post提交，数据获取
3.设定cookiesession
4.创建数据库
5.登录页面展示
6.输入登录信息
    5.1进行数据库比对 findOne();=>
        登录成功：name存入session=>跳转个人后台页面中    =>退出 路由
        登录失败：提示页=>跳转登录页继续登录


7.防止用户翻墙：定义在路由中  除了登录以外，都需要验证是否有session
    如果有session 可以进入个人后台
    如果没有session  跳转到登录页


注：findOne() 返回一个promise对象
    body-parser将数据存放在req.body中


cnpm i -S express path body-parser art-template cookie-session express-art-template mongoose cookie-parser


