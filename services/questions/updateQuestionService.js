const { QuestionModel } = require('../../models')

module.exports = async function updateQuestionService(id, data) {
    const update = await QuestionModel.findOneAndUpdate({_id: id}, data)
    return update
}