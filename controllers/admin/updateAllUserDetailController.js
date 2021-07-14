const { updateAllUserDetailService } = require('../../services/admin')

module.exports = async function updateAllUserDetailController(req, res) {
    const updateUser = await updateAllUserDetailService()
    return res.send(updateUser)
}