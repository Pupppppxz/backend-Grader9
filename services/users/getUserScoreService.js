const {UserModel} = require('../../models')

module.exports = async function getUserScoreService(id) {
    const userScore = await userModel.findOne({_id: id})
    return userScore.score
}
