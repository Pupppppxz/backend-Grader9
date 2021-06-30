const updateUserScoreService = require('./updateUserScoreService')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')
const updateSubmitCodeService = require('./updateSubmitCodeService')
const updateSubmitService = require('./updateSubmitService')

module.exports = async function updateSubmissionService(userId, questionId, code, result, status, totalScore, oldScore, oldStatus) {
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
        } else if (result === "B" || result === "T") {
            await updateUserScoreService(userId, 0, oldScore, "minus")
        }
    } catch (err) {
        console.log(err)
    } finally {
        await updateSubmitCodeService(userId, questionId, code, status)
        await updateSubmitService(userId, questionId, result, status, totalScore)
    }
    
}
