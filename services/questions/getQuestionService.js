const { QuestionModel, SubmitModel } = require('../../models')

const getQuestion = async function(){
    const question = await QuestionModel
                        .find()
                        .sort({number: 'asc'})
    return question
}

const getSubmit = async function(id){
    const question = await SubmitModel
                        .find({userId: id})
                        .select(['status','questionId'])
                        .sort({number: 'asc'})
    return question
}

module.exports = async function getQuestionService(userId){
    let question = [], 
        submit = []
    question = await getQuestion()
    submit = await getSubmit(userId)
    let item = []
    for(i = 0; i < question.length; i++) {
        if(question[i]._id === submit[i].questionId) {
            item[i] = {
                _id: question[i]._id,
                status: submit[i].status,
                question: question[i].question,
                rank: question[i].rank,
                chaya: question[i].chaya,
                unit: question[i].unit,
                detail: question[i].detail,
                str_input_1: question[i].str_input_1,
                str_output_1: question[i].str_output_2,
                str_input_2: question[i].str_input_2,
                str_output_2: question[i].str_output_2,
                str_input_3: question[i].str_input_3,
                str_output_3: question[i].str_output_2,
                number: question[i].number,
                result: submit[i].result
            }
        } else {
            item[i] = {
                _id: question[i]._id,
                status: question[i].status,
                question: question[i].question,
                rank: question[i].rank,
                chaya: question[i].chaya,
                unit: question[i].unit,
                detail: question[i].detail,
                str_input_1: question[i].str_input_1,
                str_output_1: question[i].str_output_2,
                str_input_2: question[i].str_input_2,
                str_output_2: question[i].str_output_2,
                str_input_3: question[i].str_input_3,
                str_output_3: question[i].str_output_2,
                number: question[i].number,
                result: "---"
            }
        }
    }
    return item
}