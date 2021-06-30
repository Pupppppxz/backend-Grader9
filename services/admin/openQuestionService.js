const { QuestionModel } = require('../../models')

module.exports = async function openQuestionService(id) {
    const open = await QuestionModel.findOneAndUpdate({_id: id}, {opened: true})
    return open
}