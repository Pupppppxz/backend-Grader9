const { getQuestionService } = require('../../services/questions')

module.exports = async function getQuestionController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(!req.query.id) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const question = await getQuestionService(req.query.id)
    return res.send(question)
}