const { SubmitCodeModel, SubmitModel } = require('../../models')
const updateUserScoreService = require('./updateUserScoreService')
const {getScoreByQuestionService} = require('../questions')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')

const updateSubmitCode = async function(userId, questionId, code, status) {
    const update = await SubmitCodeModel.findOneAndUpdate({userId: userId, questionId: questionId}, {code: code, status: status})
    return update
}

const updateSubmit = async function(userId, questionId, result, status, score) {
    const update = await SubmitModel.findOneAndUpdate({userId: userId, questionId: questionId}, {status: status, result: result, score: score})
    return update
}

module.exports = async function updateSubmissionService(userId, questionId, code, result, status, rank, oldScore, oldStatus) {
    const totalScore = await getScoreByQuestionService(result, rank)
    try {
        if(result !== "B" && result !== "T") {
            if(oldStatus === status) {
                await updateUserScoreService(userId, totalScore, oldScore, "equal")
            } else if(oldStatus < status && status !== 2) {
                await updateUserScoreService(userId, totalScore, oldScore, "plus")
            } else if(oldStatus < status && status === 2) {
                await updateUserScoreService(userId, totalScore, oldScore, "plus")
                await addSuccessSubmissionService(questionId, "plus")
                await addFinishedSubmissionService(userId, "plus")
            } else if (oldStatus > status && oldStatus === 2) {
                await addFinishedSubmissionService(userId, "minus")
                await addSuccessSubmissionService(questionId, "minus")
                await updateUserScoreService(userId, totalScore, oldScore, "minus")
            } else if(oldStatus > status && oldStatus !== 2) {
                await updateUserScoreService(userId, totalScore, oldScore, "minus")
            }
        } else if (result === "B") {
            await updateUserScoreService(userId, 0, oldScore, "minus")
        } else if (result === "T") {
            await updateUserScoreService(userId, 0, oldScore, "minus")
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateSubmitCode(userId, questionId, code, status)
        await updateSubmit(userId, questionId, result, status, totalScore)
    }
    
}
