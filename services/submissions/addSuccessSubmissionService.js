const { QuestionModel } = require("../../models")

module.exports = async function addSuccessSubmissionService(qId, type) {
    const question = await QuestionModel.findOne({_id: qId})
    if(type == "minus") {
        return QuestionModel.findOneAndUpdate({_id: qId}, {finished: question.finished - 1})
    } else {
        return QuestionModel.findOneAndUpdate({_id: qId}, {finished: question.finished + 1})
    }
}
