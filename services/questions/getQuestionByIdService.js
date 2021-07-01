const { QuestionModel, SubmitModel } = require('../../models')

const getQuestion = async function(id){
    const question = await QuestionModel.findOne({_id: id})
    return question
}

const getSubmit = async function(id, qId){
    const question = await SubmitModel
                        .findOne({userId: id, questionId: qId})
                        .select(['status','questionId','result'])
    if(question === null || question === undefined){
        return 0
    } else {
        return question
    }
}

module.exports = async function getQuestionByIdService(userId, questionId) {
    const [question, submit] = await Promise.all([
        getQuestion(questionId),
        getSubmit(userId, questionId)
    ])
    const input = question.input.split("$.$")
    const output = question.unit === " Pattern" ? question.output : question.output.replace("\n", "")
    const testCase = "-"
    let item = []
    if(submit !== 0) {
        items = {
            _id: question._id, 
            title: question.title,  
            status: submit.status,
            input: question.input,
            output: output,
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
        item.push(items)
    } else {
        items = {
            _id: question._id,
            title: question.title, 
            status: question.status,
            input: question.input,
            output: output,
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
        item.push(items)
    }
    return item
}
