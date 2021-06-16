const { SubmitModel } = require("../../models")

module.exports = async function insertSubmissionService(userId, questionId, status, result, score){
    const submit = new SubmitModel({
        userId,
        questionId,
        status,
        result,
        score
    })
    return submit.save()
}