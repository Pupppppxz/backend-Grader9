const {UserModel} = require('../../models')

module.exports = async function getScoreBoardService(status) {
    const scoreBoard = await UserModel
    .find({userStatus: status}, {'_id': false})
    .select(['score','nickName','finished','group','commit'])
    .sort({score: 'desc'})
    const board = scoreBoard.filter(user => user.group < 5)
    const realBoard = board.filter((user, index) => index < 3)
    return realBoard
}