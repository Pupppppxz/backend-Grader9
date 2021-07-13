const jwt = require('jsonwebtoken')

module.exports = async function destroyTokenController(req, res) {
    try {
        const token = req.user.id
        jwt.destroy(token)
        return res.status(200).json({success: "destroy!"})
    } catch (err) {
        return res.status(400).json({error: "cannot destroy"})
    }
}