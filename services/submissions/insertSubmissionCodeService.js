const { SubmitCodeModel } = require("../../models")

module.exports = async function insertSubmissionCodeService(userId, questionId, code, status){
    const newSubmission = {
        code,
        userId,
        questionId,
        status
    }
    const submit = new SubmitCodeModel(newSubmission)
    return submit.save()
}