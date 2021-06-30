const addScoreToUserService = require('./addScoreToUserService')
const insertSubmissionService = require('./insertSubmissionService')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')

const check = function(result) {
    if(result.includes("B") === false) return 1
    if(result.includes("B") === true) return 2
}

module.exports = async function createSubmissionService(userId, questionId, status, result, totalScore){
    let checked = check(result)
    try {
        if(checked === 1) {
            await addScoreToUserService(userId, totalScore)
            if (status === 2) {
                await addSuccessSubmissionService(questionId, "plus")
                await addFinishedSubmissionService(userId, "plus")
            }
            await insertSubmissionService(userId, questionId, status, result, totalScore)
        } else if(checked === 2) {
            await insertSubmissionService(userId, questionId, status, result, 0)
        }
    } catch (error) {
        console.log(error)
    }
}
