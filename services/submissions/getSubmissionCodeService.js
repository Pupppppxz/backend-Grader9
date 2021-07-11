const { SubmitCodeModel } = require('../../models')

module.exports = async function getSubmissionCodeService(uId, qId) {
    const code = await SubmitCodeModel.findOne({userId: uId, questionId: qId})
    return code
}