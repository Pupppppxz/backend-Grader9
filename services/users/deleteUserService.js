const {UserModel} = require('../../models')

module.exports = async function deleteUserService(id) {
    try {
        await UserModel.findByIdAndDelete(id)
        return {deleted: "Deleted!"}
    } catch (err) {
        return {error: "Error deleting"}
    }
}