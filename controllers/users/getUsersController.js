const {getUsersService} = require('../../services/users')

module.exports = async function getUsersController(req, res) {
    const getUser = await getUsersService(req.query.status)
    return res.send(getUser)
}