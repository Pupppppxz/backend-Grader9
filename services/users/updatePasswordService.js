const {UserModel} = require('../../models')

module.exports = async function updatePasswordService(id, password) {
    const pass = UserModel.findOneAndUpdate({_id: id},{ password: password, hash: true})
    return pass
}