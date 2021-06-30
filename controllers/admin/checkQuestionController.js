const { checkQuestionService } = require('../../services/admin')

module.exports = async function checkQuestionController(req, res) {
    if(!req.body) {
        return res.status(400).json({invalidBody: "invalid body"})
    }
    const check = await checkQuestionService(req.body)
    return res.send(check).status(200)
}