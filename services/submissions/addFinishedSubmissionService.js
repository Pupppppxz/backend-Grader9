const {UserModel} = require('../../models')

module.exports = async function addFinishedSubmissionService(userId, score) {
    const {finished} = await UserModel.findOne({_id: userId})
    return UserModel.findOneAndUpdate({_id: userId}, {finished: Number(finished) + Number(score)})
}