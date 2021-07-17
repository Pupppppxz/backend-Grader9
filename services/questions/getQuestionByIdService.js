const { QuestionModel, SubmitModel } = require('../../models')
const moment = require('moment')

const getQuestion = async function(id){
    const question = await QuestionModel.findOne({_id: id})
    return question
}

const getSubmit = async function(id, qId){
    const question = await SubmitModel
                        .findOne({userId: id, questionId: qId})
                        .select(['status','questionId','result','updatedAt'])
    if(question === null || question === undefined){
        return 0
    } else {
        return question
    }
}

module.exports = async function getQuestionByIdService(userId, questionId) {
    try {
        const [question, submit] = await Promise.all([
            getQuestion(questionId),
            getSubmit(userId, questionId)
        ])
        const testCase = "-"
        let item = []
        if(submit !== 0) {
            const time = moment(submit.updatedAt)
            items = {
                _id: question._id, 
                title: question.title,  
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
                finished: question.finished,
                time: time.utcOffset('+0700').format('l') + " " + time.utcOffset('+0700').format('LTS'),
            }
            item.push(items)
        } else {
            const input = question.input.split("$.$")
            items = {
                _id: question._id,
                title: question.title, 
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
                finished: question.finished,
            }
            item.push(items)
        }
        return item
    } catch (err) {
        return err
    }
}
