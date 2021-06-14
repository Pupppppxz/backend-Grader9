const { QuestionModel, ActivityModel } = require('../../models')
const updateNumberService = require('./updateNumberService')

const getQuestion = async function(id) {
    const question = await ActivityModel
                    .find({questionId: id})
                    .select(['number', '_id'])
    return question
}

module.exports = async function updateQuestionService(id, data) {
    const newUpdate = {
        number: data.number
    }
    let question = []
    question = await getQuestion(id)
    if(data.number !== question[0].number) {
        question.map(item => {
            updateNumberService(item._id, newUpdate)
            console.log(item._id);
        })
    }
    const update = await QuestionModel.findOneAndUpdate({_id: id}, data)
    return update
}