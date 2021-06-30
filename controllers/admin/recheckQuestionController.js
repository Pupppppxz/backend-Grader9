const { recheckQuestionService } = require('../../services/admin')

module.exports = async function recheckQuestionController(req, res) {
    if(!req.body) {
        return res.status(400).json({invalidBody: "invalid body"})
    }
    const check = await recheckQuestionService(req.body)
    return res.send(check).status(200)
}