const {UserModel} = require('../../models')
const bcrypt = require('bcryptjs')

module.exports = async function updatePasswordService(id, password) {

    let user = {}

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          throw err
        } else {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              throw err
            } else {
              console.log(hash)
              user.password = hash
              UserModel.findOneAndUpdate({_id: id}, {password: hash})
            }
          })
        }
      }) 
}