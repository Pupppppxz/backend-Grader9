const { getHistoryService } = require('../../services/submissions')
const jwt = require('jsonwebtoken')

module.exports = async function getHistoryController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.SECRET_KEY)
    if(!req.query.id || user._id !== req.query.id) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const history = await getHistoryService(req.query.id)
    return res.send(history)
}