const { fetchSubmissionService } = require("../../services/submissions")

module.exports = async function fetchSubmissionController(req, res) {
    await fetchSubmissionService(req.body)
    return res.status(200)
}