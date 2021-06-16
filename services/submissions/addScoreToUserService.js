const { UserModel } = require("../../models")

module.exports = async function addScoreToUserService(uId, scoreFromGrader) {
    const user = await UserModel.findOne({_id: uId}).select(['score'])
    const newScore = Number(user.score) + Number(scoreFromGrader)
    const addScore = await UserModel.findOneAndUpdate({_id: uId}, {score: newScore})
    return addScore
}