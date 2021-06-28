const { SubmitModel } = require("../../models")

module.exports = async function insertSubmissionService(userId, questionId, status, result, score){
    const submit = new SubmitModel({
        userId: userId,
        questionId: questionId,
        status: status,
        result: result,
        score: score
    })
    return submit.save()
}