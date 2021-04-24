const {UserModel} = require('../../models')

module.exports = async function getUsersService(status) {
    const getUser = await UserModel.find({userStatus: status})
    return getUser
}