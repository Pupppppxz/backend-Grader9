const { openQuestionService } = require('../../services/admin')

module.exports = async function openQuestionController(req, res) {
    if(!req.params) {
        return res.status(400).json({invalidBody: "invalid params"})
    }
    const check = await openQuestionService(req.params.id)
    return res.send(check).status(200)
}