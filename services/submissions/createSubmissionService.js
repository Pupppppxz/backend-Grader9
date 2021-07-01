const addScoreToUserService = require('./addScoreToUserService')
const insertSubmissionService = require('./insertSubmissionService')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')

const check = function(result) {
    if(result.includes("B") === false) return 1
    if(result.includes("B") === true) return 2
}

module.exports = async function createSubmissionService(userId, questionId, status, result, totalScore, number){
    let checked = check(result)
    try {
        if(checked === 1) {
            if (status === 2) {
                await Promise.all([
                    addSuccessSubmissionService(questionId, "plus"),
                    addFinishedSubmissionService(userId, "plus")
                ])
            }
            await Promise.all([
                addScoreToUserService(userId, totalScore),
                insertSubmissionService(userId, questionId, status, result, totalScore, number)
            ])
        } else if(checked === 2) {
            await insertSubmissionService(userId, questionId, status, result, 0)
        }
    } catch (error) {
        console.log(error)
    }
}
