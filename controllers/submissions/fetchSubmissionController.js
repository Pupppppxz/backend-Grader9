const { fetchSubmissionService } = require("../../services/submissions")

module.exports = async function fetchSubmissionController(req, res) {
    const fetch = await fetchSubmissionService(req.body)
    return res.send(fetch).status(200)
}