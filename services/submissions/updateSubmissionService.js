const updateUserScoreService = require('./updateUserScoreService')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')
const updateSubmitCodeService = require('./updateSubmitCodeService')
const updateSubmitService = require('./updateSubmitService')

const check = function(result) {
    if(result.includes("B") === false) return 1
    if(result.includes("B") === true) return 2
}
module.exports = async function updateSubmissionService(userId, questionId, code, result, status, totalScore, oldScore, oldStatus) {
    let checked = check(result)
    // console.log("ee", checked);
    // console.log("total", totalScore);
    // console.log("old", oldScore);
    // console.log("status", status);
    // console.log("olsStatus", oldStatus);
    try {
        if(checked === 1) {
            if(oldStatus === status) {
                console.log("3");
                await updateUserScoreService(userId, totalScore, oldScore, "equal")
            } else if(oldStatus < status && status !== 2) {
                console.log("4");
                await updateUserScoreService(userId, totalScore, oldScore, "plus")
            } else if(oldStatus < status && status === 2) {
                console.log("5");
                await updateUserScoreService(userId, totalScore, oldScore, "plus")
                await addSuccessSubmissionService(questionId, "plus")
                await addFinishedSubmissionService(userId, "plus")
            } else if (oldStatus > status && oldStatus === 2) {
                console.log("6");
                await addFinishedSubmissionService(userId, "minus")
                await addSuccessSubmissionService(questionId, "minus")
                await updateUserScoreService(userId, totalScore, oldScore, "minus")
            } else if(oldStatus > status && oldStatus !== 2) {
                console.log("7");
                await updateUserScoreService(userId, totalScore, oldScore, "minus")
            }
        } else if (checked === 2) {
            console.log("8");
            await updateUserScoreService(userId, 0, oldScore, "minus")
        } 
    } catch (err) {
        console.log(err)
    } finally {
        await updateSubmitCodeService(userId, questionId, code, status)
        await updateSubmitService(userId, questionId, result, status, totalScore)
    }
    
}
