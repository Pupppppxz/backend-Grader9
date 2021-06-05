const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validatePassword(data) {
    let err = {}

    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    if(validator.isEmpty(data.password)) {
        err.password = "Password field is required"
    }
    
    if(validator.isEmpty(data.password2)) {
        err.password2 = "Confirm password field is required"
    }

    if(!Validator.isLength(data.password, {min: 8, max: 30})){
        err.password = "Password must be at least 6 charactor"
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}