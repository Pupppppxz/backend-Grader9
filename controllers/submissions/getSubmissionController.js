const { getSubmissionService } = require("../../services/submissions")

module.exports = async function getSubmissionController(req, res){
    const submission = await getSubmissionService(req.query.userId, req.query.questionId)
    return res.send(submission)
}