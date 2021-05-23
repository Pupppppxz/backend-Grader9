const { SubmitCodeModel } = require('../../models')

module.exports = async function updateSubmissionCodeService(uId, qId, code, finished) {
    if(finished) {
        await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, finished)
    } else {
        await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, code)
    }
}