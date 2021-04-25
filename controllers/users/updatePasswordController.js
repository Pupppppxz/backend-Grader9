const {updatePasswordService} = require('../../services/users')
const {validatePassword} = require('../../validation')
const bcrypt = require('bcryptjs')

module.exports = async function updatePasswordController(req, res) {
    const { err, isValid } = await validatePassword(req.body)
    if(!isValid){
        return res.status(400).json(err)
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err
        } else {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err
            updatePasswordService(req.params.id ,hash)
          })
        }
      }) 
    return res.sendStatus(200)
}