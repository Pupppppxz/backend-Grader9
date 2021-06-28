const {UserModel} = require('../../models')

module.exports = async function updateUserCommitService(userId){
    const user = await UserModel.findOne({_id: userId})
    const update = await UserModel.findOneAndUpdate({_id: userId}, {commit: Number(user.commit) + 1})
    return update
}