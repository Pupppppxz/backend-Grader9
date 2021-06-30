const { getScoreBoardService } = require('../users')

const compareItem = function(a, b) {
    if(a.commit > b.commit){
        return -1
    }
    if(a.commit < b.commit){
        return 1
    }
    return 0
}

module.exports = async function getLeaderService() {
    const scoreBoard = await getScoreBoardService("user")
    const commitTable = scoreBoard.sort( compareItem )

    const object = {
        scoreBoard: scoreBoard,
        commitTable: commitTable
    }
    return object
}