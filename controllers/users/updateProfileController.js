const { updateProfileService } = require("../../services/users")

module.exports = async function updateProfileController(req, res) {
    const updateProfilePicture = updateProfileService(req.query.id, req.body)
    return res.send(updateProfilePicture)
}