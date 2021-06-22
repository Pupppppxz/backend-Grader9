const {SubmitCodeModel, SubmitModel} = require('../../models')

const getSubmit = async function(userId, questionId) {
    const submit = await SubmitModel.findOne({userId: userId, questionId: questionId}).select(['status','score','result'])
    return submit
}

const getSubmissionCode = async function(userId, questionId) {
    const code = await SubmitCodeModel.findOne({userId: userId, questionId: question}).select(['status','code'])
    return code
}
module.exports = async function getSubmissionService(userId, questionId) {
    const submission = await getSubmit(userId, questionId)
    const submissionCode = await getSubmissionCode(userId, questionId)
    const newObject = {
        result: submission.score,
        status: submission.status,
        score: submission.score,
        code: submissionCode.code
    }
    return newObject
}