const { QuestionModel, ActivityModel } = require('../../models')

const getQuestion = async function(){
    const question = await QuestionModel
                        .find()
                        .sort({number: 'asc'})
    return question
}

const getActivity = async function(id){
    const question = await ActivityModel
                        .find({userId: id})
                        .select(['number','status'])
                        .sort({number: 'asc'})
    return question
}

module.exports = async function getQuestionService(userId){
    let question = [], 
        activity = []
    question = await getQuestion()
    activity = await getActivity(userId)
    let item = []
    for(i = 0; i < question.length; i++) {
        if(question[i].number === activity[i].number) {
            item[i] = {
                _id: question[i]._id,
                status: activity[i].status,
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
                result: activity[i].result
            }
        } else {
            return {errorMessage: "Error to get questions"}
        }
    }
    return item
}