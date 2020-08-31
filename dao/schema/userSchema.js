const { Schema } = require('../conn/connect')
module.exports = new Schema({
    username: {
        required: true,
        type: String,
        minlength: 2,
        unique: true
    },
    psw: {
        required: true,
        minlength: 2,
        type: String
    },
    nickname: {
        required: true,
        type: String,
        minlength: 2,
    },
    telnum: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        minlength: 2
    },
    info: {
        type: String
    },
    logCount: {
        type: Number
    }

})