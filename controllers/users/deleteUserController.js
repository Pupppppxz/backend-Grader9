const {deleteUserService} = require('../../services/users')
const { UserModel } = require('../../models')

module.exports = async function deleteUserController(req, res) {
    try {
        const user = await UserModel.findOne({_id: req.query.id})
        if(!user || req.user.id !== req.query.id) {
            return res.status(400).json({error: "Error!"})
        }
        await deleteUserService(req.query.id)
        return res.sendStatus(200)
    } catch (err) {
        log.log(err)
    }
}