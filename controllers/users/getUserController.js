const {getUserService} = require('../../services/users')
const { check } = require('../../middleware/updated')

module.exports = async function getUserController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(!req.query.id || req.user._id !== req.query.id) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const getUser = await getUserService(req.query.id)
    return res.send(getUser)
}