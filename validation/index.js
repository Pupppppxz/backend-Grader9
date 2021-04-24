const validatorLogin = require('./login')
const validatorRegister = require('./register')
const validatePassword = require('./password')

module.exports = {
    validatorLogin,
    validatorRegister,
    validatePassword
}