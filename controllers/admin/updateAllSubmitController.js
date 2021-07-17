const { updateAllSubmitService } = require('../../services/admin')

module.exports = async function updateAllSubmitController(req, res) {
    const check = await updateAllSubmitService()
    return check
}