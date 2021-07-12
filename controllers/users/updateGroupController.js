const {updateGroupService} = require('../../services/users')

module.exports = async function updateGroupController(req, res) {
    if(req.user._id === req.query.id) {
        const group = await updateGroupService(req.query.id, req.body)
        return res.send(group)
    } else {
        return res.status(400).json({message: "GG"})
    }
}