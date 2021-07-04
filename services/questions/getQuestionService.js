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
                        .sort({number: 'asc'})
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
    const testCase = "-"
    if(submit.length > 0){
        for (let i = 0; i < question.length; i++) {
            if(count < submit.length) {
                if(submit[count].questionId == question[i]._id) {
                    let items = {
                        _id: question[i]._id,
                        title: question[i].title, 
                        status: submit[count].status,
                        rank: question[i].rank,
                        unit: question[i].unit,
                        number: question[i].number,
                        result: submit[count].result,
                        finished: question[i].finished
                    }
                    item.push(items)
                    count = count + 1
                } else {
                    const input = question[i].input.split("$.$")
                    let items = {
                        _id: question[i]._id,
                        title: question[i].title, 
                        status: question[i].status,
                        rank: question[i].rank, 
                        unit: question[i].unit,
                        number: question[i].number,
                        result: testCase.repeat(input.length),
                        finished: question[i].finished
                    }
                    item.push(items)
                }
            } else {
                const input = question[i].input.split("$.$")
                let items = {
                    _id: question[i]._id,
                    title: question[i].title, 
                    status: question[i].status,
                    rank: question[i].rank,
                    unit: question[i].unit,
                    number: question[i].number,
                    result: testCase.repeat(input.length),
                    finished: question[i].finished
                }
                item.push(items)
            }
        }
    } else {
        for (let i = 0; i < question.length; i++) {
            const input = question[i].input.split("$.$")
            let items = {
                _id: question[i]._id,
                title: question[i].title, 
                status: question[i].status,
                rank: question[i].rank,
                unit: question[i].unit,
                number: question[i].number,
                result: testCase.repeat(input.length),
                finished: question[i].finished
            }
            item.push(items)
        }
    }
    item.sort( compareItem )
    return item
}