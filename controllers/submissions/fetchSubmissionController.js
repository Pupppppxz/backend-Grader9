const { fetchSubmissionService } = require("../../services/submissions")

module.exports = async function fetchSubmissionController(req, res) {
    const fetch = await fetchSubmissionService(req.body.code, req.query.userId, req.query.questionId)
    return res.send(fetch)
}