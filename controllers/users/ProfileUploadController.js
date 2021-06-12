const { profileUploadService } = require("../../services/users")

module.exports = async function ProfileUploadController(req, res) {
    if (!req.body) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        })
    }
    const upload = await profileUploadService(req.query.id, req.file) 
    return res.send(upload)
}