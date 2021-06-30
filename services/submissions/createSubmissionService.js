const addScoreToUserService = require('./addScoreToUserService')
const insertSubmissionService = require('./insertSubmissionService')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')
const { getScoreByQuestionService } = require("../questions")

module.exports = async function createSubmissionService(userId, questionId, status, result, totalScore){

    try {
        if(result !== "B" && result !== "T") {
            await addScoreToUserService(userId, totalScore)
            if (status === 2) {
                await addSuccessSubmissionService(questionId, "plus")
                await addFinishedSubmissionService(userId, "plus")
            }
            await insertSubmissionService(userId, questionId, status, result, totalScore)
        } else if (result === "T") {
            await insertSubmissionService(userId, questionId, status, result, 0)
        } else if(result === "B") {
            await insertSubmissionService(userId, questionId, status, result, 0)
        }
    } catch (error) {
        console.log(error)
    }
}
