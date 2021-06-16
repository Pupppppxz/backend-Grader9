const {UserModel} = require('../../models')

module.exports = async function getScoreUsers(id) {
    const userScore = await userModel.findOne({_id: id})
    return userScore.score
}