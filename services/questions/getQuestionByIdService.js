const { QuestionModel } = require('../../models')

module.exports = async function getQuestionByIdService(id) {
    const question = await QuestionModel.find({_id: id})
    return question
}