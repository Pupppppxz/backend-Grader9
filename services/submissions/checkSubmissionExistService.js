const { SubmitCodeModel } = require('../../models')

module.exports = async function checkSubmissionExistService(uId, qId) {
    const submissions = SubmitCodeModel.find({userId: uId, questionId: qId})
    if(submissions) {
        return true
    } 
    return false
}