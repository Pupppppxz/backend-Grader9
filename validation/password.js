const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validatePassword(data) {
    let err = {}

    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    if(Validator.isEmpty(data.oldPassword)) {
        err.oldPassword = "Old password field is required"
    }

    if(Validator.isEmpty(data.password)) {
        err.password = "Password field is required"
    }
    
    if(Validator.isEmpty(data.password2)) {
        err.password2 = "Confirm password field is required"
    }

    if(!Validator.isLength(data.password, {min: 8, max: 30})){
        err.password = "Password must be at least 8 charactor"
    }

    if(!Validator.equals(data.password, data.password2)){
        err.password2 = "Password must match"
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}
