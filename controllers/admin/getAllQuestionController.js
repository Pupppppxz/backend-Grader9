const { getAllQuestionService } = require('../../services/admin')

module.exports = async function getAllQuestionController(req, res) {
    const question = await getAllQuestionService()
    return res.send(question).status(200)
}