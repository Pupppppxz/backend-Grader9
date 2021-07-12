const { updateUserService } = require('../../services/users')

module.exports = async function updateUserController(req, res) {
    if(req.user._id === req.params.id) {
        const update = await updateUserService(req.params.id, req.body)
        return res.send(update)
    } else {
        return res.status(400).json({message: "GG"})
    }
}