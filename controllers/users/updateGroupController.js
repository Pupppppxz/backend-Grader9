const {updateGroupService} = require('../../services/users')
const jwt = require('jsonwebtoken')

module.exports = async function updateGroupController(req, res) {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.SECRET_KEY)
    if(user._id === req.query.id) {
        const group = await updateGroupService(req.query.id, req.body)
        return res.send(group)
    } else {
        return res.status(400).json({message: "GG"})
    }
}