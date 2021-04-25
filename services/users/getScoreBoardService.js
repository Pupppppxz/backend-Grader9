const {UserModel} = require('../../models')

module.exports = async function getScoreBoardService(status) {
    const scoreBoard = await UserModel
    .find({userStatus: status})
    .select(['score','nickName'])
    .sort({score: 'desc'})
    return scoreBoard
}