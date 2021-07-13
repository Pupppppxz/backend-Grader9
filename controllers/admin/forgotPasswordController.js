const bcrypt = require('bcryptjs')
const { decrypt } = require('../../middleware/encode')
const { UserModel } = require('../../models')
const sha256 = require('sha256')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async function forgotPasswordController(req, res) {
    const p1 = decrypt(req.query.p1)
    const p2 = sha256(req.query.p2)
    const id = req.query.userId
    try {
        if(p1 === process.env.A_PASS && req.query.p3 === process.env.CONFIRM) {
            const user = await UserModel.findOne({_id: id})
            if(!user) {
                return res.status(400).json({Hello: "Hello world!!!"})
            } else {
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(p2, salt)
                await updatePasswordService(req.query.userId, hash)
                return res.status(200).json({updateSuccess: "Success update password!"})
            }
        } else {
            return res.status(400).json({Hello: "GG!"})
        }
    } catch (err) {
        return res.status(400).json({Error: "Hello world!"})
    }
}