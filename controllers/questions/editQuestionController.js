const { updateQuestionService } = require('../../services/questions')

module.exports = async function editQuestionController(req, res) {
    await updateQuestionService(req.params.id, req.body)
    return res.send("update completed")
}