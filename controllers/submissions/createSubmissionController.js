const { createSubmissionService } = require('../../services/submissions')

module.exports = async function createSubmissionController(){
    await createSubmissionService(req.body)
    return resizeBy.sendStatus(200)
}