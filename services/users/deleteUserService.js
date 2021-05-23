const {UserModel} = require('../../models')

module.exports = async function deleteUserService(id) {
    const deleteUser = await UserModel.findByIdAndDelete(id)
    return deleteUser
}