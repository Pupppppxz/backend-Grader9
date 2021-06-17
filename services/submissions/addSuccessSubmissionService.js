const { QuestionModel } = require("../../models")

module.exports = async function addSuccessSubmissionService(qId, score) {
    const { finished } = await QuestionModel.findOne({_id: qId})
    return QuestionModel.findOneAndUpdate({_id: qId}, {finished: Number(finished) + Number(score)})
}
