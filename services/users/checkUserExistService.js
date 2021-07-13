const { UserModel } = require('../../models')

module.exports = async function checkUserExistService(id) {
    const user = await UserModel.findOne({_id: id})
    if(user === null) {
        return false 
    }
    return true
}