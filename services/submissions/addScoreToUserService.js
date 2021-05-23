const { UserModel } = require("../../models")

module.exports = async function addScoreToUserService(uId, uScore) {
    const user = await UserModel.find({_id: uId})
    newScore = user.score + uScore
    const addScore = await UserModel.findOneAndUpdate({_id: uId}, {score: newScore})
    return addScore
}