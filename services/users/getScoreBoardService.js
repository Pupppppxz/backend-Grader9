const {UserModel} = require('../../models')

module.exports = async function getScoreBoardService(status) {
    const scoreBoard = await UserModel
    .find({userStatus: status})
    .select(['_id','score','nickName','username','finished','profilePicture','group','commit'])
    .sort({score: 'desc'})
    const board = scoreBoard.filter(user => user.group < 5)
    return board
}