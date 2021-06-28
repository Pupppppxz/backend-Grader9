const {UserModel} = require('../../models')

module.exports = async function addFinishedSubmissionService(userId, type) {
    const user = await UserModel.findOne({_id: userId})
    if(type === "minus") {
        return UserModel.findOneAndUpdate({_id: userId}, {finished: user.finished - 1})
    } else {
        return UserModel.findOneAndUpdate({_id: userId}, {finished: user.finished + 1})
    }
}