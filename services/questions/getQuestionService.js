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
                        console.log(question);
    if(question.length === 0){
        return 0
    } else {
        return question
    }
}

const compareItem = function(a, b) {
    if(a.rank < b.rank){
        return -1
    }
    if(a.rank > b.rank){
        return 1
    }
    return 0
}

module.exports = async function getQuestionService(userId){
    const [question, submit] = await Promise.all([
        getQuestion(),
        getSubmit(userId)
    ])
    let item = []
    let count = 0
    for(i = 0; i < question.length; i++) {
        if(submit > 0){
            if(count <= submit.length) {
                if(submit[count].questionId === String(question[i]._id)) {
                    let items = {
                        _id: question[i]._id,
                        title: question[i].title, 
                        status: submit[count].status,
                        question: question[i].question,
                        rank: question[i].rank,
                        linkPDF: question[i].linkPDF,
                        chaya: question[i].chaya,
                        unit: question[i].unit,
                        detail: question[i].detail,
                        str_input_1: question[i].str_input_1,
                        str_output_1: question[i].str_output_1,
                        str_input_2: question[i].str_input_2,
                        str_output_2: question[i].str_output_2,
                        str_input_3: question[i].str_input_3,
                        str_output_3: question[i].str_output_3,
                        q_input: question[i].q_input,
                        q_output: question[i].q_output,
                        number: question[i].number,
                        result: submit[count].result,
                        finished: question[i].finished
                    }
                    item.push(items)
                    count = count + 1
                    console.log("hhh", i);
                } else {
                    let items = {
                        _id: question[i]._id,
                        title: question[i].title, 
                        status: question[i].status,
                        question: question[i].question,
                        rank: question[i].rank,
                        linkPDF: question[i].linkPDF,
                        chaya: question[i].chaya,
                        unit: question[i].unit,
                        detail: question[i].detail,
                        str_input_1: question[i].str_input_1,
                        str_output_1: question[i].str_output_1,
                        str_input_2: question[i].str_input_2,
                        str_output_2: question[i].str_output_2,
                        str_input_3: question[i].str_input_3,
                        str_output_3: question[i].str_output_3,
                        q_input: question[i].q_input,
                        q_output: question[i].q_output,
                        number: question[i].number,
                        result: "----",
                        finished: question[i].finished
                    }
                    item.push(items)
                } 
            } else {
                let items = {
                    _id: question[i]._id,
                    title: question[i].title, 
                    status: question[i].status,
                    question: question[i].question,
                    rank: question[i].rank,
                    linkPDF: question[i].linkPDF,
                    chaya: question[i].chaya,
                    unit: question[i].unit,
                    detail: question[i].detail,
                    str_input_1: question[i].str_input_1,
                    str_output_1: question[i].str_output_1,
                    str_input_2: question[i].str_input_2,
                    str_output_2: question[i].str_output_2,
                    str_input_3: question[i].str_input_3,
                    str_output_3: question[i].str_output_3,
                    q_input: question[i].q_input,
                    q_output: question[i].q_output,
                    number: question[i].number,
                    result: "----",
                    finished: question[i].finished
                }
                item.push(items)
            }
        } else {
            let items = {
                _id: question[i]._id,
                title: question[i].title, 
                status: question[i].status,
                question: question[i].question,
                rank: question[i].rank,
                linkPDF: question[i].linkPDF,
                chaya: question[i].chaya,
                unit: question[i].unit,
                detail: question[i].detail,
                str_input_1: question[i].str_input_1,
                str_output_1: question[i].str_output_1,
                str_input_2: question[i].str_input_2,
                str_output_2: question[i].str_output_2,
                str_input_3: question[i].str_input_3,
                str_output_3: question[i].str_output_3,
                q_input: question[i].q_input,
                q_output: question[i].q_output,
                number: question[i].number,
                result: "----",
                finished: question[i].finished
            }
            item.push(items)
        }
    }
    item.sort( compareItem )
    return item
}