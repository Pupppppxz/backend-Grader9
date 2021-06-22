const {updateGroupService} = require('../../services/users')

module.exports = async function updateGroupController(req, res) {
    const group = await updateGroupService(req.query.id, req.body)
    return res.send(group)
}