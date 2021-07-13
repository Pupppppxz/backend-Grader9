const { getUsersService } = require('../../services/users')

module.exports = async function getUsersController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(!req.query.status) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const getUser = await getUsersService(req.query.status)
    return res.send(getUser)
}