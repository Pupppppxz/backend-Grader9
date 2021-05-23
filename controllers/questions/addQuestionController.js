const { addQuestionService } = require('../../services/questions')

module.exports = async function addQuestionController(req, res) {
    if (!req.body) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        })
    }
    await addQuestionService(req.body)
    return res.sendStatus(200)
}