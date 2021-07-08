const { getQuestionByIdService } = require('../../services/questions')

module.exports = async function getQuestionByIdController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(!req.params.userId || !req.params.questionId) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const question = await getQuestionByIdService(req.params.userId, req.params.questionId)
    return res.send(question)
}