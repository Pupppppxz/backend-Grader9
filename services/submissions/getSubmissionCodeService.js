const { SubmitCodeModel } = require('../../models')

module.exports = async function getSubmissionCodeService(uId, qId) {
    const code = await SubmitCodeModel.find({userId: uId, questionId: qId})
    return code
}