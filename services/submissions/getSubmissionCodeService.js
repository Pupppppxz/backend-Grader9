const { SubmitCodeModel } = require('../../models')

module.exports = async function getSubmissionCodeService(uId, qId) {
    try {
        const code = await SubmitCodeModel.findOne({userId: uId, questionId: qId})
        if(code) {
            return code
        } else {
            const obj = {
                code: `printf("Hello world")`
            }
            return obj
        }
    } catch (err) {
        return {cannotGet: "cannot get"}
    }
}