const { SubmitCodeModel } = require("../../models")

const check = function(result) {
    let tmp = result.split("")
    let i = false
    for (let i = 0; i < tmp.length; i++) {
        if((["C","L","F","Y","X","O","N","B","P","-"]).includes(result) === true) {
            i = true
        }
        if(i === false) {
            return 0
        }
    }
    if(i === true) {
        if((["C","L","F","Y","X","O","B"]).includes(result) === false) return 1
        if((["C","L","F","Y","X","O","B"]).includes(result) === true) return 2
    }
}

module.exports = async function insertSubmissionCodeService(userId, questionId, code, status, result) {
    let checked = check(result)
    try {
        if(checked > 0) {
            const newSubmission = {
                code,
                userId,
                questionId,
                status
            }
            const submit = new SubmitCodeModel(newSubmission)
            return submit.save()
        }
    } catch (error) {
        return {Error: error}
    }
}