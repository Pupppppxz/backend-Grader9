const { QuestionModel, SubmitModel, SubmitCodeModel, UserModel, HistoryModel } = require('../../models')
const { updateUserScoreService } = require('../submissions')
const addFinishedSubmissionService = require('../submissions/addFinishedSubmissionService')
const { setUpdateAll } = require('../../middleware/updated')

const getSubmit = async function(id) {
    const submitArr = await SubmitModel.find({questionId: id})
    if(submitArr.length === 0) {
        return 0
    } else {
        return submitArr   
    }
}

const deleteQuestion = async function(id){
    const delQuestion = await QuestionModel.findByIdAndDelete(id)
    return delQuestion
}

const deleteSubmit = async function(id) {
    const delSubmit = await SubmitModel.deleteOne({_id: id})
    return delSubmit
}

const deleteSubmitCode = async function(id) {
    const delSubmitCode = await SubmitCodeModel.deleteMany({questionId: id})
    return delSubmitCode
}
const deleteHistory = async function(id) {
    const delHistory = await HistoryModel.deleteMany({questionId: id})
    return delHistory
}

module.exports = async function deleteQuestionService(id) {
    try {
        const submit = await getSubmit(id)
        if(submit !== 0) {
            await deleteQues
            for(let i = 0; i < submit.length; i++){
                if(submit[i].score !== 0){
                    const user = await UserModel.findOne({_id: submit[i].userId})
                    if(user) {
                        await Promise.all([
                            updateUserScoreService(submit[i].userId, 0, submit[i].score, "minus"),
                            addFinishedSubmissionService(submit[i].userId, "minus")
                        ]) 
                    }
                }
                await deleteSubmit(submit[i]._id)
            }
        }      
    } catch (err) {
        return err    
    } finally {
        await Promise.all([
            deleteSubmitCode(id),
            deleteQuestion(id),
            deleteHistory(id),
            setUpdateAll()
        ])
    }
    return {Success: "deleted!"}
}
