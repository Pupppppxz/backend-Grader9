const { QuestionModel } = require("../../models")

module.exports = async function addSuccessSubmissionService(qId) {
    const { finished } = await QuestionModel.find({_id: qId}).select(['finished'])
    await QuestionModel.findOneAndUpdate({_id: qId}, {finished: finished + 1})
}