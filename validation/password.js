const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validatePassword(data) {
    let err = {}

    data.password = !isEmpty(data.password) ? data.password : ""

    if(!Validator.isLength(data.password, {min: 8, max: 30})){
        err.password = "Password must be at least 6 charactor"
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}