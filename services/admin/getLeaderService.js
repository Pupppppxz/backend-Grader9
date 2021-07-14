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

const compareScore = function(a, b) {
    if(a.score > b.score){
        return -1
    }
    if(a.score < b.score){
        return 1
    }
    return 0
}

module.exports = async function getLeaderService() {
    const scoreBoard = await getScoreBoardService("user")
    const commitTable = scoreBoard.sort( compareItem )

    const object = {
        scoreBoard: scoreBoard.sort( compareScore ),
        commitTable: commitTable
    }
    return object
}