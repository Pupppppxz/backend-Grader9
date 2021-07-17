const { SubmitCodeModel } = require('../../models')

module.exports = async function getSubmissionCodeService(uId, qId) {
    try {
        const code = await SubmitCodeModel.findOne({userId: uId, questionId: qId})
        if(code) {
            return code
        } else {
            const obj = {
                code: `printf("Don't send empty code again, pls")`
            }
            return obj
        }
    } catch (err) {
        return {cannotGet: "cannot get"}
    }
}