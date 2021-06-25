const {UserModel, QuestionModel} = require('../../models')

const getUserRankings = async function(id) {
    let allUsers = []
    allUsers = await UserModel
            .find({userStatus: "user"})
            .select(['score','_id'])
            .sort({score: 'desc'})
    let ranking = allUsers.findIndex(allUser => String(allUser._id) === id)
    return ranking + 1
}

getProgression = async function(passed) {
    const allquestions = await QuestionModel.find({})
    const questionLength = allquestions.length
    const progress = Number(passed) / Number(questionLength)
    return progress.toFixed(4) * 100
}

module.exports = async function getUserService(id) {
    const ranking = await getUserRankings(id)
    const getUser = await UserModel.findOne({_id: id})
    const progress = await getProgression(getUser.finished)
    const user = {
        nickName: getUser.nickName,
        username: getUser.username,
        userStatus: getUser.userStatus,
        hash: getUser.hash,
        score: getUser.score,
        finished: getUser.finished,
        profilePicture: getUser.profilePicture,
        userRank: ranking,
        commit: getUser.commit,
        progress: progress,
        group: getUser.group
    }
    return user
}
