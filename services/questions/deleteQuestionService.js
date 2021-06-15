const { QuestionModel, SubmitModel, SubmitCodeModel } = require('../../models')
const mongoose = require('mongoose')

const deleteQuestion = async function(id){
    const deleteQuestion = await QuestionModel.findByIdAndDelete(id)
    return deleteQuestion
}

const deleteSubmit = async function(id) {
    const deleteSubmit = await SubmitModel.deleteMany({questionId: id})
    return deleteSubmit
}

const deleteSubmitCode = async function(id) {
    const deleteSubmitCode = await SubmitCodeModel.deleteMany({questionId: id})
    return deleteSubmitCode
}

module.exports = async function deleteQuestionService(id) {
    let ID = mongoose.Types.ObjectId(id)
    await deleteQuestion(ID)
    await deleteSubmit(ID)
    await deleteSubmitCode(ID)
    return {Success: "deleted!"}
}