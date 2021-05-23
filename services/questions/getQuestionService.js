const { QuestionModel } = require('../../models')

module.exports = async function getQuestionService(){
    const question = await QuestionModel
    .find()
    .sort({rank: 'asc'})
    return question
}