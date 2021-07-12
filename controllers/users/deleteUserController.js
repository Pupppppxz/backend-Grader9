const {deleteUserService} = require('../../services/users')
const { UserModel } = require('../../models')
const jwt = require('jsonwebtoken')

module.exports = async function deleteUserController(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const userr = jwt.verify(token, process.env.SECRET_KEY)
        const user = await UserModel.findOne({_id: req.query.id})
        if(!user || userr._id !== req.query.id) {
            return res.status(400).json({error: "Error!"})
        }
        await deleteUserService(req.query.id)
        return res.sendStatus(200)
    } catch (err) {
        log.log(err)
    }
}