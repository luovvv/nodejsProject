const { Schema } = require('../conn/connect')
module.exports = new Schema({
    logUsername: {
        required: true,
        type: String,
        minlength: 2,
        // 用户名不重复

    },
    logIp: {
        type: String,
    },
    logTime: {
        type: String,
    },
    logBrownser: {
        type: String,
    },
    logUrl: {
        type: String,
    }
})