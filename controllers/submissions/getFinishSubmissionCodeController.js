const { getFinishSubmissionCodeService } = require('../../services/submissions')

module.exports = async function getFinishSubmissionCodeController(req, res) {
    const code = await getFinishSubmissionCodeService(req.query.userId, req.query.questionId)
    return res.send(code)
}