const { UserModel } = require('../../models')

module.exports = async function updateUserService(id, data) {
    try {
        await UserModel.findOneAndUpdate({_id: id}, data)
        return {updated: "updated!"}
    } catch (err) {
        return {Error: "Error!"}
    }
}