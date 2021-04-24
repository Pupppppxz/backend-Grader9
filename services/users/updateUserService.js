const { UserModel } = require('../../models')

module.exports = async function updateUserService(id, data) {
    const update = await UserModel.findOneAndUpdate({_id: id}, data)
    return update
}