const { 
    addScoreToUserService,
    insertSubmissionService,
    addFinishedSubmissionService
} = require(".")
const { 
    getScoreByQuestionService, 
    getQuestionByIdService 
} = require("../questions")

module.exports = async function createSubmissionService(userId, questionId, status, result, rank){

    try {
        const totalScore = await getScoreByQuestionService(result, rank)
        await addScoreToUserService(userId, totalScore)
        if (status === 2) {
            await addSuccessSubmissionService(questionId)
            await addFinishedSubmissionService(userId, 1)
        }
        await insertSubmissionService(userId, questionId, status, result, totalScore)
        // let before = await getScoreByQuestionService(userId, questionId)
        // let after = await getScoreByQuestionService(userId, questionId)
        // const diff = before - after
        // const { input, scorePerCase } = getQuestionByIdService(questionId)
        // const maxScore = input.split('$.$').length * scorePerCase
        // if(maxScore === after && diff != 0) {
        //     await addSuccessSubmissionService(questionId)
        // }
        // if (diff > 0) {
        //     await addScoreToUserService(userId, diff)
        // }
        // if(score === maxScore) {
        //     await updateSubmissionCodeService(userId, questionId, {code: ''}, {finished: true})
        // }
    } catch (error) {
        console.log(error)
    }
}