const { QuestionModel } = require('../../models')

module.exports = async function graderGetQuestionService(id){
    const question = await QuestionModel
    .find({_id: id}) 
    .select(['str_input_1','str_output_1','str_input_2','str_output_2','str_input_3','str_output_3'])
    return question
}