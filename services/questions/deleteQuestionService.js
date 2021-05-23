const { QuestionModel } = require('../../models')

module.exports = async function deleteQuestionService(id) {
    const deleteQuestion = await QuestionModel.findByIdAndDelete(id)
    return deleteQuestion
}