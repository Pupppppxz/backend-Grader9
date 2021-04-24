const bcrypt = require('bcryptjs')
const {validatorRegister} = require('../../validation')
const {UserModel} = require('../../models')

module.exports = function registerUser(req, res) {
    const { err, isValid } = validatorRegister(req.body)

    if (!isValid) {
        return res.status(400).json(err);
    }

    UserModel.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" })
        } else {
            const newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
}