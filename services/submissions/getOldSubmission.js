const { SubmitModel } = require('../../models')

module.exports = async function getOldSubmission(userId, questionId) {
    const submission = await SubmitModel.findOne({userId: userId, questionId: questionId})
    return submission
}