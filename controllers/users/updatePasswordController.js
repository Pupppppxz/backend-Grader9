const { updatePasswordService } = require('../../services/users')
const { validatePassword } = require('../../validation')
const bcrypt = require('bcryptjs')
const { UserModel } = require('../../models')

module.exports = async function updatePasswordController(req, res) {
  try {
    if(req.user.id === req.params.id) {
      const newPassword = req.body.password
      const confirmPassword = req.body.password2
      const oldPassword = req.body.oldPassword
      const data = {
        password: newPassword, 
        password2: confirmPassword, 
        oldPassword: oldPassword
      }
      const user = await UserModel.findOne({_id: req.params.id})
      if(!user){
        return res.status(401).json({invalidUser: "User does not exist"})
      } else {
        const validPassword = await bcrypt.compare(oldPassword, user.password)
        if(validPassword) {
          const { err, isValid } = await validatePassword(data)
          if(!isValid){
            return res.status(400).json(err)
          }
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(newPassword, salt)
          await updatePasswordService(req.params.id, hash)
          return res.status(200).json({updateSuccess: "Success update password!"})
        } else {
          return res.status(401).json({IncorrectOldPassword: "Incorrect password"})
        }
      }
    } else {
      return res.status(400).json({Hello: "Hello world!"})
    }
  } catch (err) {
    return res.status(400).json({Hello: "Hello world!"})
  }
}
