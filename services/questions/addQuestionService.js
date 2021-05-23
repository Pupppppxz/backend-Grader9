const { QuestionModel } = require('../../models')

module.exports = async function addQuestionService(data) {
    console.log(data);
    const question = new QuestionModel(data)
    return question.save()
}  