const { SubmitModel } = require("../../models")
const { getQuestionByIdService } = require("../questions")

module.exports = async function lookupSubmissionService(uId) {
    let submission = await SubmitModel.find({userId: uId})
    submission = await Promise.all(submission.map(async sub => {
        const {input, scorePerCase} = await getQuestionByIdService(sub.questionId)
        const maxScore = input.split('$.$').length * scorePerCase
        return { ...sub, maxScore}
    }))
    return submission
}