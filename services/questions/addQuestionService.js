const { QuestionModel } = require('../../models')

module.exports = async function addQuestionService(data) {
    const question = new QuestionModel(data)
    return question.save()
}