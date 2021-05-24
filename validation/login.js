const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatorLogin(data) {
    let err = {}

    data.nickName = !isEmpty(data.nickName) ? data.nickName : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    if(Validator.isEmpty(data.nickName)){
        err.nickName = "Nickname field is required"
    }

    if(Validator.isEmpty(data.password)){
        err.password = "Password field is required"
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}