const { getLeaderService } = require('../../services/admin')

module.exports = async function getLeaderController(req, res) {
    const check = await getLeaderService()
    return res.send(check).status(200)
}