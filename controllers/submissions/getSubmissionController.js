const { getSubmissionService } = require("../../services/submissions")

module.exports = async function getSubmissionController(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    const submission = await getSubmissionService(req.query.userId)
    return res.send(submission).status(200)
}