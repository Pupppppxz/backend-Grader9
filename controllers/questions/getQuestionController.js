const { getQuestionService } = require('../../services/questions')

module.exports = async function getQuestionController(req, res) {
    const question = await getQuestionService(req.query.id)
    return res.send(question)
}