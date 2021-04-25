const {getScoreBoardService} = require('../../services/users')

module.exports = async function getScoreBoardController(req, res) {
    const getScoreBoard = await getScoreBoardService(req.params.status)
    return res.send(getScoreBoard)
}