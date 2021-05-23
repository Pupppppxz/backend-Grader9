const { deleteQuestionService } = require('../../services/questions')

module.exports = async function deleteQuestionController(req, res) {
    await deleteQuestionService(req.params.id)
    return res.sendStatus(200)
}