const { getQuestionService } = require('../../services/questions')

module.exports = async function getQuestionController(req, res) {
    const question = await getQuestionService()
    return res.send(question)
}