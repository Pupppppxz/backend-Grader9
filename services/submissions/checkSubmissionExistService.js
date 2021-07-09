const { SubmitModel } = require('../../models')

module.exports = async function checkSubmissionExistService(uId, qId) {
    const submissions = await SubmitModel.findOne({userId: uId, questionId: qId})
    if(submissions === null) {
        return false
    }
    return true
}