const { insertSubmissionService, addScoreToUserService, addSuccessSubmissionService, updateSubmissionCodeService } = require(".")
const { getScoreByQuestionService, getQuestionByIdService } = require("../questions")

module.exports = async function createSubmissionService(data){
    const {
        userId,
        questionId,
        score,
        result,
        time
    } = data
    try {
        let before = await getScoreByQuestionService(userId, questionId)
        await insertSubmissionService(data)
        let after = await getScoreByQuestionService(userId, questionId)
        const diff = before - after
        const { input, scorePerCase } = getQuestionByIdService(questionId)
        const maxScore = input.split('$.$').length * scorePerCase
        if(maxScore === after && diff != 0) {
            await addSuccessSubmissionService(questionId)
        }
        if (diff > 0) {
            await addScoreToUserService(userId, diff)
        }
        if(score === maxScore) {
            await updateSubmissionCodeService(userId, questionId, {code: ''}, {finished: true})
        }
    } catch (error) {
        console.log(error)
    }
}