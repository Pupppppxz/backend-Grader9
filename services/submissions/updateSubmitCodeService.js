const { SubmitCodeModel } = require('../../models')

const checkSubmissionExist = async (userId, questionId) => {
    const check = await SubmitCodeModel.findOne({userId: userId, questionId: questionId})
    if(check.length > 0) {
        return 0
    } else {
        return 1
    }
}

module.exports = async function updateSubmitCodeService(userId, questionId, code, status) {
    try {
        const check = await checkSubmissionExist(userId, questionId)
        if(check === 0) {
            const update = await SubmitCodeModel.findOneAndUpdate({userId: userId, questionId: questionId}, {code: code, status: status})
            return update   
        } else {
            const newSubmission = {
                code,
                userId,
                questionId,
                status
            }
            const submit = new SubmitCodeModel(newSubmission)
            return submit.save()
        }
    } catch (err) {
        return err
    }
}