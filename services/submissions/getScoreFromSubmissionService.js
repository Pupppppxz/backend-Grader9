const { SubmitModel } = require('../../models')

module.exports = async function getScoreFromSubmissionService(userId, questionId) {
    const submit = await SubmitModel.findOne({userId: userId, questionId: questionId})
    return submit.score
}