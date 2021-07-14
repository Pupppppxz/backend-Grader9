const { UserModel } = require('../../models')

const compareScore = function(a, b) {
    if(a.score === b.score && a.commit < b.commit){
        return -1
    }
    if(a.score < b.score){
        return 1
    }
    return 0
}

module.exports = async function getScoreBoardService(status) {
    const scoreBoard = await UserModel
    .find({userStatus: status}, {'_id': false})
    .select(['score','nickName','finished','group','commit'])
    .sort({score: 'desc'})
    const board = scoreBoard.filter(user => user.group < 5)
    const realBoard = board.sort( compareScore )
    const realRealBoard = realBoard.splice(0,3)
    return realRealBoard
}