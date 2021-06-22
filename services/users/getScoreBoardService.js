const {UserModel} = require('../../models')

module.exports = async function getScoreBoardService(status) {
    const scoreBoard = await UserModel
    .find({userStatus: status})
    .select(['score','nickName','username','finished','profilePicture','group'])
    .sort({score: 'desc'})
    return scoreBoard
}