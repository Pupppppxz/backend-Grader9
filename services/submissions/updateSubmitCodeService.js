const { SubmitCodeModel } = require('../../models')

module.exports = async function updateSubmitCodeService(userId, questionId, code, status) {
    try {
        const update = await SubmitCodeModel.findOneAndUpdate({userId: userId, questionId: questionId}, {code: code, status: status})
        return update  
    } catch (err) {
        return err
    }
}