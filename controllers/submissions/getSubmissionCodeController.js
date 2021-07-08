const { getSubmissionCodeService } = require('../../services/submissions')

module.exports = async function getSubmissionCodeController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(!req.query.userId || !req.query.questionId) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const code = await getSubmissionCodeService(req.query.userId, req.query.questionId)
    return res.send(code)
}