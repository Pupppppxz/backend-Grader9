const { updateUserService } = require('../../services/users')

module.exports = async function updateUserController(req, res) {
    await updateUserService(req.params.id, req.body)
    return res.sendStatus(200)
}