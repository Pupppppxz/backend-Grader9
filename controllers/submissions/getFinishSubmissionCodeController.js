const { getFinishSubmissionCodeService } = require('../../services/submissions')

module.exports = async function getFinishSubmissionCodeController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    const code = await getFinishSubmissionCodeService(req.query.userId, req.query.questionId)
    return res.send(code)
}