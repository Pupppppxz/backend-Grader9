const { QuestionModel } = require('../../models')

module.exports = async function addQuestionService(data) {
    const question = new QuestionModel(data)
    question.save()
    return {_id: question._id}
}  