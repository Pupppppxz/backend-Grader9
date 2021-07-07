const { getHistoryService } = require('../../services/submissions')

module.exports = async function getHistoryController(req, res) {
    const history = await getHistoryService(req.query.id)
    return res.send(history)
}