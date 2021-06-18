const { QuestionModel, SubmitModel } = require('../../models')

const getQuestion = async function(id){
    const question = await QuestionModel.findOne({_id: id})
    return question
}

const getSubmit = async function(id, qId){
    const question = await SubmitModel
                        .findOne({userId: id, questionId: qId})
                        .select(['status','questionId','result'])
    return question
}

module.exports = async function getQuestionByIdService(userId, questionId) {
    const question = await getQuestion(questionId)
    const submit = await getSubmit(userId, questionId)
    let item = []
    if(submit) {
        let items = {
            _id: question._id, 
            title: question.title, 
            status: submit.status,
            question: question.question,
            rank: question.rank,
            chaya: question.chaya,
            unit: question.unit,
            detail: question.detail,
            str_input_1: question.str_input_1,
            str_output_1: question.str_output_2,
            str_input_2: question.str_input_2,
            str_output_2: question.str_output_2,
            str_input_3: question.str_input_3,
            str_output_3: question.str_output_2,
            number: question.number,
            result: submit.result, 
            finished: question.finished
        }
        item.push(items)
    } else {
        let items = {
            _id: question._id,
            title: question.title, 
            status: question.status,
            question: question.question,
            rank: question.rank,
            chaya: question.chaya,
            unit: question.unit,
            detail: question.detail,
            str_input_1: question.str_input_1,
            str_output_1: question.str_output_2,
            str_input_2: question.str_input_2,
            str_output_2: question.str_output_2,
            str_input_3: question.str_input_3,
            str_output_3: question.str_output_2,
            number: question.number,
            result: "---",
            finished: question.finished
        }
        item.push(items)
    }
    return item
}
