const {UserModel, QuestionModel, SubmitModel} = require('../../models')

const getUserRankings = async function(id) {
    let allUsers = []
    allUsers = await UserModel
            .find({userStatus: "user"})
            .select(['score','_id'])
            .sort({score: 'desc'})
    let ranking = allUsers.findIndex(allUser => String(allUser._id) === id)
    return ranking + 1
}

const getProgression = async function(passed) {
    const allQuestions = await QuestionModel.find({})
    const questionLength = allQuestions.length
    const progress = Float(passed) / Float(questionLength)
    const realProgress = progress.toFixed(4) * 100
    return realProgress
}

const checkExist = async function(userId) {
    const check = await SubmitModel.findOne({userId: userId})
    if(check === null) {
        return false
    }
    return true
}

module.exports = async function getUserService(id) {
    const [exist, ranking, getUser] = await Promise.all([
        checkExist(id),
        getUserRankings(id),
        UserModel.findOne({_id: id})
    ])
    const check = (exist === true ? ranking : "ไม่มีอันดับ")
    const progress = await getProgression(getUser.finished)
    const user = {
        nickName: getUser.nickName,
        username: getUser.username,
        userStatus: getUser.userStatus,
        hash: getUser.hash,
        score: getUser.score,
        finished: getUser.finished,
        profilePicture: getUser.profilePicture,
        userRank: check,
        commit: getUser.commit,
        progress: progress,
        group: getUser.group
    }
    return user
}
