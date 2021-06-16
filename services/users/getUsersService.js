const {UserModel} = require('../../models')

module.exports = async function getUsersService(status) {
    const getUser = await UserModel.find({userStatus: status})
    const user = {
        nickName: getUser.nickName,
        username: getUser.username,
        userStatus: getUser.userStatus,
        hash: getUser.hash,
        score: getUser.score,
        finished: getUser.finished,
        profile: getUser.profile,
        commit: getUser.commit
    }
    return user
}