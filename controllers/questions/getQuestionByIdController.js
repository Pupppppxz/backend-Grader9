const { getQuestionByIdService } = require('../../services/questions')

module.exports = async function getQuestionByIdController(req, res) {
    const question = await getQuestionByIdService(req.params.userId, req.params.questionId)
    return res.send(question)
}