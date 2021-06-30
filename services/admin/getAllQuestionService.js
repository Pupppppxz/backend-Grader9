const { QuestionModel } = require('../../models')

module.exports = async function getAllQuestionService() {
    const question = QuestionModel
                    .find({})
                    .select(['_id','input','output','question','rank','opened','number','finished','unit','detail'])
                    .sort({number: 'asc'})
    return question
}