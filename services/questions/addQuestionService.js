const { QuestionModel, UserModel, SubmitModel } = require('../../models')

module.exports = async function addQuestionService(data) {
    const question = new QuestionModel(data)
    question.save()
    return question._id
}