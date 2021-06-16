const {UserModel} = require('../../models')

const getUserRankings = async function(id) {
    let allUsers = []
    allUsers = await UserModel
            .find({userStatus: "user"})
            .select(['score','_id'])
            .sort({score: 'desc'})
    let ranking
    for (let i = 0; i < allUsers.length; i++) {
        if(allUsers[i]._id === id) {
            ranking = i + 1
            break
        }
    }
    return ranking
}

module.exports = async function getUserService(id) {
    const ranking = await getUserRankings(id)
    const getUser = await UserModel.findOne({_id: id})
    const user = {
        nickName: getUser.nickName,
        username: getUser.username,
        userStatus: getUser.userStatus,
        hash: getUser.hash,
        score: getUser.score,
        finished: getUser.finished,
        profile: getUser.profile,
        userRank: ranking,
        commit: getUser.commit
    }
    return user
}