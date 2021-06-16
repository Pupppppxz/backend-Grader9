const { SubmitCodeModel } = require('../../models')

module.exports = async function getFinishSubmissionCodeService(qId) {
    const code = await SubmitCodeModel.find({questionId: qId, status: 2}).select(['code']).limit(5)
    return code
}