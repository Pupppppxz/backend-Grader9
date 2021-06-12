const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatorLogin(data) {
    let err = {}

    data.username = !isEmpty(data.username) ? data.username : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    if(Validator.isEmpty(data.username)){
        err.username = "Username field is required"
    }

    if(Validator.isEmpty(data.password)){
        err.password = "Password field is required"
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}