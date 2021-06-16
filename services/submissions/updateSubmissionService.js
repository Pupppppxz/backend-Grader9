const { SubmitCodeModel, SubmitModel } = require('../../models')
const { 
    updateUserScoreService, 
    getScoreByQuestionService,
    addFinishedSubmissionService
} = require('.')

const oldSubmission = async function(userId, questionId) {
    const bermberm = await SubmitModel.findOne({ userId: userId, questionId: questionId}).select(['status','score'])
    return bermberm
}

module.exports = async function updateSubmissionService(uId, qId, code, result, status, rank) {
    const oldSubmit = await oldSubmission(userId, questionId)
    if(oldSubmit.status === status) {
        await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, {code: code})
        const totalScore = await getScoreByQuestionService(result, rank)
        await updateUserScoreService(uId, totalScore, oldSubmit.score, "equal")
    } else if(oldSubmit.status < status) {
        await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, {code: code, status: status})
        const totalScore = await getScoreByQuestionService(result, rank)
        await updateUserScoreService(uId, totalScore, oldSubmit.score, "plus")
    } else if (oldSubmit.status > status && oldSubmit.status === 2) {
        await addFinishedSubmissionService(uId, -1)
        await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, {code: code, status: status})
        const totalScore = await getScoreByQuestionService(result, rank)
        await updateUserScoreService(uId, totalScore, oldSubmit.score, "minus")
    } else {
        await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, {code: code, status: status})
        const totalScore = await getScoreByQuestionService(result, rank)
        await updateUserScoreService(uId, totalScore, oldSubmit.score, "minus")
    }
    // if(finished) {
    //     await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, finished)
    // } else {
    //     await SubmitCodeModel.findOneAndUpdate({userId: uId, questionId: qId}, code)
    // }
}