const updateUserScoreService = require('./updateUserScoreService')
const addFinishedSubmissionService = require('./addFinishedSubmissionService')
const addSuccessSubmissionService = require('./addSuccessSubmissionService')
const updateSubmitCodeService = require('./updateSubmitCodeService')
const updateSubmitService = require('./updateSubmitService')

const check = function(result) {
    if((["C","L","F","Y","X","O","B"]).includes(result) === false) return 1
    if((["C","L","F","Y","X","O","B"]).includes(result) === true) return 2
}

module.exports = async function updateSubmissionService(userId, questionId, code, result, status, totalScore, oldScore, oldStatus, group) {
    let checked = check(result)
    try {
        if(checked === 1) {
            if(oldStatus === status) {
                // console.log("3");
                await updateUserScoreService(userId, totalScore, oldScore, "equal")
            } else if(oldStatus < status && status !== 2) {
                // console.log("4");
                await updateUserScoreService(userId, totalScore, oldScore, "plus")
            } else if(oldStatus < status && status === 2) {
                // console.log("5");
                if(group < 5) {
                    await Promise.all([
                        updateUserScoreService(userId, totalScore, oldScore, "plus"),
                        addSuccessSubmissionService(questionId, "plus"),
                        addFinishedSubmissionService(userId, "plus")
                    ])
                } else {
                    await Promise.all([
                        updateUserScoreService(userId, totalScore, oldScore, "plus"),
                        addFinishedSubmissionService(userId, "plus")
                    ])
                }
            } else if (oldStatus > status && oldStatus === 2) {
                // console.log("6");
                if(group < 5) {
                    await Promise.all([
                        addFinishedSubmissionService(userId, "minus"),
                        addSuccessSubmissionService(questionId, "minus"),
                        updateUserScoreService(userId, totalScore, oldScore, "minus")
                    ])
                } else {
                    await Promise.all([
                        addFinishedSubmissionService(userId, "minus"),
                        updateUserScoreService(userId, totalScore, oldScore, "minus")
                    ])
                }
            } else if(oldStatus > status && oldStatus !== 2) {
                // console.log("7");
                await updateUserScoreService(userId, totalScore, oldScore, "minus")
            }
        } else if (checked === 2) {
            // console.log("8");
            await updateUserScoreService(userId, 0, oldScore, "minus")
        }
    } catch (err) {
        return {Error: error}
    } finally {
        await Promise.all([
            updateSubmitCodeService(userId, questionId, code, status),
            updateSubmitService(userId, questionId, result, status, totalScore)
        ])
    }
}
