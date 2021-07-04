const { QuestionModel, SubmitModel, SubmitCodeModel } = require('../../models')
const { updateUserScoreService } = require('../submissions')
const { getUserScoreService } = require('../users')
const mongoose = require('mongoose')

const getSubmit = async function(id) {
    const submitArr = await SubmitModel.find({questionId: id})
    if(submitArr.length === 0) {
        return 0
    } else {
        return submitArr   
    }
}

const deleteQuestion = async function(id){
    const deleteQuestion = await QuestionModel.findByIdAndDelete(id)
    return deleteQuestion
}

const deleteSubmit = async function(id) {
    const deleteSubmit = await SubmitModel.findOneAndDelete({questionId: id})
    return deleteSubmit
}

const deleteSubmitCode = async function(id) {
    const deleteSubmitCode = await SubmitCodeModel.deleteMany({questionId: id})
    return deleteSubmitCode
}

module.exports = async function deleteQuestionService(id) {
    try {
        const submit = await getSubmit(id)
        if(submit === 0) {
            await deleteQuestion(id)
        } else {
            for(let i = 0; i < submit.length; i++){
                const oldScore = await getUserScoreService(submit[i].userId)
                if(submit[i].score !== 0){
                   await updateUserScoreService(submit[i].userId, submit[i].score, oldScore, "minus")    
                }
                await deleteSubmit(submit[i]._id)
            }
        }      
    } catch (err) {
        console.log(err)   
    } finally {
        await deleteSubmitCode(id)
        await deleteQuestion(id)
    }
    return {Success: "deleted!"}
}
