const { QuestionModel, SubmitModel } = require('../../models')

const getQuestion = async function(id){
    const question = await QuestionModel.findOne({_id: id})
    return question
}

const getSubmit = async function(id, qId){
    const question = await SubmitModel
                        .findOne({userId: id, questionId: qId})
                        .select(['status','questionId','result'])
    if(typeof question !== null && typeof question !== undefined){
        return 0
    } else {
        return question
    }
}

module.exports = async function getQuestionByIdService(userId, questionId) {
    const question = await getQuestion(questionId)
    const submit = await getSubmit(userId, questionId)
    const input = question.input.split("$.$")
    const testCase = "-"
    let item
    if(submit !== 0) {
        item = {
            _id: question._id, 
            title: question.title, 
            input: question.input, 
            output: question.output, 
            status: submit.status,
            question: question.question,
            rank: question.rank,
            linkPDF: question.linkPDF,
            chaya: question.chaya,
            unit: question.unit,
            detail: question.detail,
            str_input_1: question.str_input_1,
            str_output_1: question.str_output_1,
            str_input_2: question.str_input_2,
            str_output_2: question.str_output_2,
            str_input_3: question.str_input_3,
            str_output_3: question.str_output_3,
            q_input: question.q_input,
            q_output: question.q_output,
            number: question.number,
            result: submit.result, 
            finished: question.finished
        }
    } else {
        item = {
            _id: question._id,
            title: question.title, 
            input: question.input,
            output: question.output,  
            status: question.status,
            question: question.question,
            rank: question.rank,
            linkPDF: question.linkPDF,
            chaya: question.chaya,
            unit: question.unit,
            detail: question.detail,
            str_input_1: question.str_input_1,
            str_output_1: question.str_output_1,
            str_input_2: question.str_input_2,
            str_output_2: question.str_output_2,
            str_input_3: question.str_input_3,
            str_output_3: question.str_output_3,
            q_input: question.q_input,
            q_output: question.q_output,
            number: question.number,
            result: testCase.repeat(input.length),
            finished: question.finished
        }
    }
    return item
}
