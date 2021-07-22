const { check } = require('../../middleware/updated')
const jwt = require('jsonwebtoken')

module.exports = async function checkUpdatedController(req, res) {
    const checked = await check(req.query.id)
    const token = req.headers.authorization.split(" ")[1]
    if(checked) {
        jwt.destroy(token)
        return res.send(200).json({status: 2})
    } else {
        return res.send(200).json({status: 1})
    }
}