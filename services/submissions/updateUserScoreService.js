const { UserModel } = require("../../models")

module.exports = async function updateUserScoreService(uId, scoreFromGrader, oldScore, type) {
    const user = await UserModel.findOne({_id: uId}).select(['score'])
    let newScore
    try {
        if(type === "plus") {
            newScore = Number(user.score) + (Number(scoreFromGrader) - Number(oldScore))
        } else if(type === "minus") {
            newScore = Number(user.score) - (Number(oldScore) - Number(scoreFromGrader))
        } else {
            if(scoreFromGrader < oldScore) {
                newScore = Number(user.score) - (Number(oldScore) - Number(scoreFromGrader))
            } else if(scoreFromGrader > oldScore) {
                newScore = Number(user.score) + (Number(scoreFromGrader) - Number(oldScore))
            } else {
                newScore = Number(user.score)
            }
        }
    } catch (err) {
        console.error(err)
    } finally {
        if(newScore < 0) {
            const addScore = await UserModel.findOneAndUpdate({_id: uId}, {score: 0})
            return addScore
        } else {
            const addScore = await UserModel.findOneAndUpdate({_id: uId}, {score: newScore})
            return addScore
        }
    }
}