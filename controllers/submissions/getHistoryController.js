const { getHistoryService } = require('../../services/submissions')

module.exports = async function getHistoryController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(!req.query.id || req.user.id !== req.query.id) {
        return res.status(401).json({Error: "Hello world!"})
    }
    const history = await getHistoryService(req.query.id)
    return res.send(history)
}