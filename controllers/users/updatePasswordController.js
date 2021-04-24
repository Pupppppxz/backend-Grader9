const bcrypt = require('bcryptjs')
const {updatePasswordService} = require('../../services/users')

module.exports = async function updatePasswordController(req, res) {
    const { err, isValid } = await validatePassword(req.body)
    if(!isValid){
        return res.status(400).json(err)
    } else {
        updatePasswordService(req.params.id ,req.body.password)
        return res.sendStatus(200)
    }
}