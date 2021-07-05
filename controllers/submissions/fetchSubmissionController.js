const { fetchSubmissionService } = require("../../services/submissions")

module.exports = async function fetchSubmissionController(req, res) {
    const data = await fetchSubmissionService(req.body)
    return res.status(200).send(data)
}