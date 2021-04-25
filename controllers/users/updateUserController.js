const { updateUserService } = require('../../services/users')

module.exports = async function updateUserController(req, res) {
    const update = await updateUserService(req.params.id, req.body)
    return res.send(update)
}