const {getScoreBoardService} = require('../../services/users')

module.exports = async function getScoreBoardController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    const getScoreBoard = await getScoreBoardService(req.params.status)
    return res.send(getScoreBoard)
}