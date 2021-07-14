const { SubmitCodeModel } = require("../../models")

module.exports = async function insertSubmissionCodeService(userId, questionId, code, status) {
    try {
        const newSubmission = {
            code,
            userId,
            questionId,
            status
        }
        const submit = new SubmitCodeModel(newSubmission)
        return submit.save()
    } catch (error) {
        return {Error: error}
    }
}