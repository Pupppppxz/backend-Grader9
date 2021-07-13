const { updateUserService } = require('../../services/users')

module.exports = async function updateUserController(req, res) {
    if(req.user.id === req.params.id || !req.body.nickName) {
        const update = await updateUserService(req.params.id, {nickName: req.body.nickName})
        return res.send(update)
    } else {
        return res.status(400).json({message: "GG"})
    }
}