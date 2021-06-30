const { SubmitCodeModel, SubmitModel } = require('../../models')
const updateUserScoreService = require('./updateUserScoreService')
const {getScoreByQuestionService} = require('../questions')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')
const getScoreFromSubmissionService = require('./getScoreFromSubmissionService')

const oldSubmission = async function(userId, questionId) {
    const bermberm = await SubmitModel.findOne({ userId: userId, questionId: questionId}).select(['status','score'])
    console.log(bermberm);
    return bermberm
}

const updateSubmitCode = async function(userId, questionId, code, status) {
    const update = await SubmitCodeModel.findOneAndUpdate({userId: userId, questionId: questionId}, {code: code, status: status})
    return update
}

const updateSubmit = async function(userId, questionId, result, status, score) {
    const update = await SubmitModel.findOneAndUpdate({userId: userId, questionId: questionId}, {status: status, result: result, score: score})
    return update
}

module.exports = async function updateSubmissionService(userId, questionId, code, result, status, rank) {
    const oldSubmit = await oldSubmission(userId, questionId)
    const totalScore = await getScoreByQuestionService(result, rank)
    try {
        if(result !== "B" && result !== "T") {
            if(oldSubmit.status === status) {
                await updateUserScoreService(userId, totalScore, oldSubmit.score, "equal")
            } else if(oldSubmit.status < status && status !== 2) {
                await updateUserScoreService(userId, totalScore, oldSubmit.score, "plus")
            } else if(oldSubmit.status < status && status === 2) {
                await updateUserScoreService(userId, totalScore, oldSubmit.score, "plus")
                await addSuccessSubmissionService(questionId, "plus")
                await addFinishedSubmissionService(userId, "plus")
            } else if (oldSubmit.status > status && oldSubmit.status === 2) {
                await addFinishedSubmissionService(userId, "minus")
                await addSuccessSubmissionService(questionId, "minus")
                await updateUserScoreService(userId, totalScore, oldSubmit.score, "minus")
            } else if(oldSubmit.status > status && oldSubmit.status !== 2) {
                await updateUserScoreService(userId, totalScore, oldSubmit.score, "minus")
            }
        } else if (result === "B") {
            await updateUserScoreService(userId, 0, oldSubmit.score, "minus")
        } else if (result === "T") {
            await updateUserScoreService(userId, 0, oldSubmit.score, "minus")
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateSubmitCode(userId, questionId, code, status)
        await updateSubmit(userId, questionId, result, status, totalScore)
    }
    
}
