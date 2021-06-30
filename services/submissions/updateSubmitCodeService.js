const { SubmitCodeModel } = require('../../models')

module.exports = async function updateSubmitCodeService(userId, questionId, code, status) {
    const update = await SubmitCodeModel.findOneAndUpdate({userId: userId, questionId: questionId}, {code: code, status: status})
    console.log("update submit");
    return update
}