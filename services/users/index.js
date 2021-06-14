const loginService = require('./loginService')
const registerService = require('./registerService')
const updateUserService = require('./updateUserService')
const getUsersService = require('./getUsersService')
const getUserService = require('./getUserService')
const deleteUserService = require('./deleteUserService')
const updatePasswordService = require('./updatePasswordService')
const getScoreBoardService = require('./getScoreBoardService')
const profileUploadService = require('./profileUploadService')

module.exports = {
    loginService,
    registerService,
    updateUserService,
    getUsersService,
    getUserService,
    deleteUserService,
    updatePasswordService,
    getScoreBoardService,
    profileUploadService,
}