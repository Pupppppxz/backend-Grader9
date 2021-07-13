const addScoreToUserService = require('./addScoreToUserService')
const insertSubmissionService = require('./insertSubmissionService')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')

const check = function(result) {
    let tmp = result.split("")
    let i = false
    for (let i = 0; i < tmp.length; i++) {
        if((["C","L","F","Y","X","O","N","B","P","-"]).includes(result) === true) {
            i = true
        }
        if(i === false) {
            return 0
        }
    }
    if(i === true) {
        if((["C","L","F","Y","X","O","B"]).includes(result) === false) return 1
        if((["C","L","F","Y","X","O","B"]).includes(result) === true) return 2
    }
}

module.exports = async function createSubmissionService(userId, questionId, status, result, totalScore, number, group){
    let checked = check(result)
    try {
        if(checked > 0) {
            if(checked === 1) {
                if (status === 2 && group < 5) {
                    await Promise.all([
                        addSuccessSubmissionService(questionId, "plus"),
                        addFinishedSubmissionService(userId, "plus")
                    ])
                } else {
                    addFinishedSubmissionService(userId, "plus")
                }
                await Promise.all([
                    addScoreToUserService(userId, totalScore),
                    insertSubmissionService(userId, questionId, status, result, totalScore)
                ])
            } else if(checked === 2) {
                await insertSubmissionService(userId, questionId, status, result, 0)
            }
        }
    } catch (error) {
        return {Error: error}
    }
}
