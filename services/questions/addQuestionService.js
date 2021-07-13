const { QuestionModel } = require('../../models')

module.exports = async function addQuestionService(data) {
    const question = new QuestionModel(data)
    await question.save()
    return question._id
}