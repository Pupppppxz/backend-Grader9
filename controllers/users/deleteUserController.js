const {deleteUserService} = require('../../services/users')

module.exports = async function deleteUserController(req, res) {
    await deleteUserService(req.query.id)
    return res.sendStatus(200)
}