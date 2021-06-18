const { QuestionModel, SubmitModel } = require('../../models')

const getQuestion = async function(){
    const question = await QuestionModel
                        .find({})
                        .sort({number: 'asc'})
    return question
}

const getSubmit = async function(id){
    const question = await SubmitModel
                        .find({userId: id})
                        .select(['status','questionId','result'])
                        .sort({number: 'asc'})
    if(question.length === 0){
        return 0
    } else {
        return question
    }
}

module.exports = async function getQuestionService(userId){
    const question = await getQuestion()
    // console.log(question);
    const submit = await getSubmit(userId)
    console.log(submit);
    let item = []
    let count = 0
    for(i = 0; i < question.length; i++) {
        if(submit === 0){
            let items = {
                _id: question[i]._id,
                title: question[i].title, 
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
                q_input: question[i].q_input,
                q_output: question[i].q_output,
                number: question[i].number,
                result: "----",
                finished: question[i].finished
            }
            item.push(items)
        } else {
            if(submit[count].questionId === question[i]._id.toString()) {
                let items = {
                    _id: question[i]._id,
                    title: question[i].title, 
                    status: submit[count].status,
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
                    q_input: question[i].q_input,
                    q_output: question[i].q_output,
                    number: question[i].number,
                    result: submit[count].result,
                    finished: question[i].finished
                }
                item.push(items)
                count = count + 1
            } else {
                let items = {
                    _id: question[i]._id,
                    title: question[i].title, 
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
                    q_input: question[i].q_input,
                    q_output: question[i].q_output,
                    number: question[i].number,
                    result: "----",
                    finished: question[i].finished
                }
                item.push(items)
            } 
        }
    }
    return item;
}
