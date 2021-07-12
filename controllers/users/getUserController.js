const {getUserService} = require('../../services/users')
const { check } = require('../../middleware/updated')
const jwt = require('jsonwebtoken')

module.exports = async function getUserController(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.SECRET_KEY)
    if(!req.query.id || user._id !== req.query.id) {
        return res.status(400).json({Error: "Hello world!"})
    }
    const getUser = await getUserService(req.query.id)
    return res.send(getUser)
}