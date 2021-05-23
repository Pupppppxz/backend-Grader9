const { SubmitCodeModel } = require("../../models")

module.exports = async function insertSubmissionCodeService(userId, questionId, code){
    const newSubmission = {
        code,
        userId,
        questionId
    }
    const submit = new SubmitCodeModel(newSubmission)
    return submit.save()
}