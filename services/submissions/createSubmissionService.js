const { 
    addScoreToUserService,
    insertSubmissionService,
    addFinishedSubmissionService
} = require(".")
const { 
    getScoreByQuestionService
} = require("../questions")

module.exports = async function createSubmissionService(userId, questionId, status, result, rank){

    try {
        const totalScore = await getScoreByQuestionService(result, rank)
        await addScoreToUserService(userId, totalScore)
        if (status === 2) {
            await addSuccessSubmissionService(questionId, 1)
            await addFinishedSubmissionService(userId, 1)
        }
        await insertSubmissionService(userId, questionId, status, result, totalScore)
    } catch (error) {
        console.log(error)
    }
}
