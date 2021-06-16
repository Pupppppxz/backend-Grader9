const { QuestionModel } = require("../../models")

module.exports = async function addSuccessSubmissionService(qId) {
    const { finished } = await QuestionModel.findOne({_id: qId})
    return QuestionModel.findOneAndUpdate({_id: qId}, {finished: Number(finished + 1)})
}