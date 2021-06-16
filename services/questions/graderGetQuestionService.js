const { QuestionModel } = require('../../models')

module.exports = async function graderGetQuestionService(id){
    const question = await QuestionModel
    .findOne({_id: id}) 
    .select(['input','output'])
    return question
}