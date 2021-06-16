const { SubmitCodeModel } = require('../../models')

module.exports = async function checkSubmissionExistService(uId, qId) {
    const submissions = SubmitCodeModel.findOne({userId: uId, questionId: qId})
    if(submissions) {
        return true
    } 
    return false
}