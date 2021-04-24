const {getUserService} = require('../../services/users')

module.exports = async function getUserController(req, res) {
    const getUser = await getUserService(req.query.id)
    return res.send(getUser)
}