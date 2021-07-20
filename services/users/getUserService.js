const {UserModel, QuestionModel, SubmitModel} = require('../../models')

const getUserRankings = async function(id) {
    let allUsers = []
    allUsers = await UserModel
            .find({userStatus: "user"})
            .select(['score','_id','group'])
            .sort({score: 'desc'})
    let all = allUsers.filter(user => user.group < 5)
    let ranking = all.findIndex(allUser => String(allUser._id) === id)
    return ranking + 1
}

const getProgression = async function(passed, qLength) {
    const progress = Number(passed) * 100 / Number(qLength)
    const realProgress = progress.toFixed(2)
    return realProgress
}

const getQuestionsLength = async function() {
    const qLength = await QuestionModel.find({})
    return qLength.length
} 

const checkExist = async function(userId) {
    const check = await SubmitModel.findOne({userId: userId})
    if(check === null) {
        return false
    }
    return true
}

const updateFinished = async function(id, qLength) {
    const user = await UserModel.findOneAndUpdate({_id: id},{finished: qLength})
    return user
}

module.exports = async function getUserService(id) {
    try {
        const [exist, ranking, getUser, qLength] = await Promise.all([
            checkExist(id),
            getUserRankings(id),
            UserModel.findOne({_id: id}),
            getQuestionsLength()
        ])
        if(getUser) {
            const check = (exist === true ? ranking : "ไม่มีอันดับ")
            let progress = await getProgression(getUser.finished, qLength)
            if(qLength < getUser.finished) {
                await updateFinished(getUser._id, qLength)
                progress = 100
                progress.toFixed(2)
            }
            const user = {
                nickName: getUser.nickName,
                username: getUser.username,
                userStatus: getUser.userStatus,
                hash: getUser.hash,
                score: getUser.score,
                finished: getUser.finished,
                profilePicture: getUser.profilePicture,
                userRank: getUser.group < 5 ? check : 0,
                commit: getUser.commit,
                progress: progress,
                group: getUser.group
            }
            return user
        } else {
            return {cannotGet: "cannot get"}
        }
    } catch (err) {
        return {Error: "Error!"}
    }
}
