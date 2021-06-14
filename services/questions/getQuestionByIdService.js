const { QuestionModel, SubmitModel } = require('../../models')

const getQuestion = async function(id){
    const question = await QuestionModel.findOne({_id: id})
    return question
}

const getSubmit = async function(id, qId){
    const question = await SubmitModel
                        .findOne({userId: id, questionId: qId})
                        .select(['status','questionId'])
    return question
}

module.exports = async function getQuestionByIdService(questionId, userId) {
    let question = [], 
        submit = []
    question = await getQuestion(questionId)
    submit = await getSubmit(userId, questionId)
    let item = []
    if(question[0]._id === submit[0].questionId) {
        item[0] = {
            _id: question[0]._id,
            status: submit[0].status,
            question: question[0].question,
            rank: question[0].rank,
            chaya: question[0].chaya,
            unit: question[0].unit,
            detail: question[0].detail,
            str_input_1: question[0].str_input_1,
            str_output_1: question[0].str_output_2,
            str_input_2: question[0].str_input_2,
            str_output_2: question[0].str_output_2,
            str_input_3: question[0].str_input_3,
            str_output_3: question[0].str_output_2,
            number: question[0].number,
            result: submit[0].result
        }
    } else {
        item[i] = {
            _id: question[0]._id,
            status: question[0].status,
            question: question[0].question,
            rank: question[0].rank,
            chaya: question[0].chaya,
            unit: question[0].unit,
            detail: question[0].detail,
            str_input_1: question[0].str_input_1,
            str_output_1: question[0].str_output_2,
            str_input_2: question[0].str_input_2,
            str_output_2: question[0].str_output_2,
            str_input_3: question[0].str_input_3,
            str_output_3: question[0].str_output_2,
            number: question[0].number,
            result: "---"
        }
    }
    return item
}