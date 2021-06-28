const { SubmitCodeModel } = require('../../models')

module.exports = async function checkSubmissionExistService(uId, qId) {
    const submissions = await SubmitCodeModel.findOne({userId: uId, questionId: qId})
    console.log('submission' + submissions);
    if(submissions === null) {
        return false
    }
    return true
}