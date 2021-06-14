const { graderGetQuestionService } = require('../../services/questions')

module.exports = async function getQuestionController(req, res) {
    const question = await graderGetQuestionService(req.query.id)
    return res.send(question)
}