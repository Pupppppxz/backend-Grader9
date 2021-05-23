const { SubmitCodeModel } = require('../../models')

module.exports = async function getFinishCode(qId) {
    const code = await SubmitCodeModel.find({questionId: qId, finished: true})
    return code
}