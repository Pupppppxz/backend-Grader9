const { json } = require('body-parser')
const { getQuestionByIdService, getScoreByQuestionService, getFinishCode } = require('../questions')

module.exports = async function getFinishSubmissionCodeService(uId, qId) {
    const {input, scorePerCase } = await getQuestionByIdService(qId)
    console.log(input);
    console.log(scorePerCase);
    const maxScore = input.split('$.$').length * scorePerCase
    const userScore = await getScoreByQuestionService(uId, qId)
    if(userScore === maxScore) {
        const code = await getFinishCode(qId)
        return code
    } else {
        return json({data: "You are not allowed."})
    }
}