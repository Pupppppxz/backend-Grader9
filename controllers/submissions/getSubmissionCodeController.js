const { getSubmissionCodeService } = require('../../services/submissions')

module.exports = async function getSubmissionCodeController(req, res) {
    const code = await getSubmissionCodeService(req.query.userId, req.query.questionId)
    return res.send(code)
}