const { createSubmissionService } = require('../../services/submissions')

module.exports = async function createSubmissionController(req, res){
    await createSubmissionService(req.body)
    return res.sendStatus(200)
}