const { getScoreBoardService, checkUserExistService } = require('../../services/users')

module.exports = async function getScoreBoardController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    const check = await checkUserExistService(req.user.id)
    if(check === true) {
        if(!req.params.status) {
            return res.status(400).json({Error: "Hello world!"})
        }
        const getScoreBoard = await getScoreBoardService(req.params.status)
        return res.send(getScoreBoard)
    } else {
        return res.status(401)
    }
}