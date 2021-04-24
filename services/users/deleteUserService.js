const {UserModel} = require('../../models')

module.exports = async function deleteUserService(id) {
    const getUser = await UserModel.findByIdAndDelete(id)
    return getUser
}