const timer = () => {
        let t = new Date();
        let y = t.getFullYear();
        let m = t.getMonth() + 1;

        //将m转为字符串 。 往前补零，补足为两位
        m = (m + '').padStart(2, '0')

        let d = t.getDate()
        d = (d + '').padStart(2, '0')

        // 返回所需格式的年月日
        return `${y}-${m}-${d}`
    }
    // timer是一个函数
module.exports = timer