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

const getScoreBoard = async () => {
    const scoreBoard = await UserModel
    .find({userStatus: "user"}, {'_id': false})
    .select(['score','nickName','finished','group','commit'])
    .sort({score: 'desc'})
    const board = scoreBoard.filter(user => user.group < 5)
    const realRealBoard = board.sort( compareScore )
    return realRealBoard
}

const getCommitTable = async () => {
    const scoreBoard = await UserModel
    .find({userStatus: "user"}, {'_id': false})
    .select(['score','nickName','finished','group','commit'])
    .sort({commit: 'desc'})
    const board = scoreBoard.filter(user => user.group < 5)
    return board
}

module.exports = async function getLeaderService() {
    const scoreBoard = await getScoreBoard()
    const commitTable = await getCommitTable()

    // const object = {
    //     scoreBoard,
    //     commitTable,
    // }
    return scoreBoard
}