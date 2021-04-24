const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatorLogin(data) {
    let err = {}

    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    if(Validator.isEmpty(data.email)){
        err.email = "Email field is required"
    } else if (!Validator.isEmail(data.email)){
        err.email = "Email is invalid"
    }

    if(Validator.isEmail(data.password)){
        err.password = "Password field is required"
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}