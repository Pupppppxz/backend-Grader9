const {updatePasswordService} = require('../../services/users')
const {validatePassword} = require('../../validation')
const bcrypt = require('bcryptjs')
const { UserModel } = require('../../models')
const { decrypt } = require('../../middleware/encode')

module.exports = async function updatePasswordController(req, res) {
  try {
    const newPassword = decrypt(req.body.password)
    const confirmPassword = decrypt(req.body.password2)
    const oldPassword = decrypt(req.body.oldPassword)
    const user = await UserModel.findOne({_id: req.params.id})
    if(!user){
      return res.status(401).json({invalidUser: "User does not exist"})
    } else {
      const validPassword = await bcrypt.compare(oldPassword, user.password)
      if(validPassword) {
        const { err, isValid } = await validatePassword({newPassword, confirmPassword, oldPassword})
        if(!isValid){
          return res.status(401).json(err)
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)
        await updatePasswordService(req.params.id, hash)
        return res.status(200).json({updateSuccess: "Success update password!"})
      } else {
        return res.status(401).json({IncorrectOldPassword: "Incorrect password"})
      }
    }
  } catch (err) {
    return res.status(400).json({Hello: "Hello world!"})
  }
}
