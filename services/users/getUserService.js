const {UserModel} = require('../../models')

module.exports = async function getUserService(id) {
    const getUser = await UserModel.find({_id: id})
    return getUser
}