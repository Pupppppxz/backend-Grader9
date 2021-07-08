const { graderGetQuestionService } = require('../../services/questions')

module.exports = async function getQuestionController(req, res) {
    if(!req.params.questionId) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const question = await graderGetQuestionService(req.params.questionId)
    return res.send(question)
}