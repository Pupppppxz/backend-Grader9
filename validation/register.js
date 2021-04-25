const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validatorRegister(data) {
    let err = {}

    data.nickName = !isEmpty(data.nickName) ? data.nickName : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    if(Validator.isEmpty(data.nickName)){
        err.name = "Name field is required"
    }

    if(Validator.isEmpty(data.password)){
        err.password = "Password field is required"
    }

    if(Validator.isEmpty(data.password2)){
        err.password2 = "Confirm password field is required"
    }

    if(!Validator.isLength(data.password, {min: 8, max: 30})){
        err.password = "Password must be at least 6 charactor"
    }

    if(!Validator.equals(data.password, data.password2)){
        err.password2 = "Password must match"
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}