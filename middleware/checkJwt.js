const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports = function checkJwt(req, res, next) {
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)
            req.user = user
        } else {
            return res.status(400).json({Error: "Cannot access"})
        }
        next()
    } catch (err) {
        return res.status(400).json({error: "Cannot access!"})
    }
}