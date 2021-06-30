const { SubmitModel } = require("../../models")

module.exports = async function insertSubmissionService(userId, questionId, status, result, score, number){
    const submit = new SubmitModel({
        userId: userId,
        questionId: questionId,
        status: status,
        result: result,
        score: score,
        number: number
    })
    return submit.save()
}