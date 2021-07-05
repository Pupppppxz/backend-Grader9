const { fetchSubmissionService } = require("../../services/submissions")

module.exports = async function fetchSubmissionController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    const data = await fetchSubmissionService(req.body)
    return res.status(200).send(data)
}