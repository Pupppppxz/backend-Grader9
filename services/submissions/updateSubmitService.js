const { SubmitModel } = require('../../models')

module.exports = async function updateSubmitService(userId, questionId, result, status, score) {
    const update = await SubmitModel.findOneAndUpdate({userId: userId, questionId: questionId}, {status: status, result: result, score: score})
    console.log("add submit");
    return update
}