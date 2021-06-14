const { deleteQuestionService } = require('../../services/questions')

module.exports = async function deleteQuestionController(req, res) {
    const deleteQuestion = await deleteQuestionService(req.params.id)
    return res.send(deleteQuestion)
}