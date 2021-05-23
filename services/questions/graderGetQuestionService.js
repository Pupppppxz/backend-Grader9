const { QuestionModel } = require('../../models')

module.exports = async function graderGetQuestionService(){
    const question = await QuestionModel
    .find() 
    .select(['_id','input','output'])
    .sort({rank: 'asc'})
    return question
}