const bcrypt = require('bcryptjs')
const {validatorRegister} = require('../../validation')
const {UserModel} = require('../../models')

module.exports = function registerUser(req, res) {
    const { err, isValid } = validatorRegister(req.body)

    if (!isValid) {
        return res.status(400).json(err);
    }

    UserModel.findOne({username: req.body.username})
    .then(user => {
        if (user) {
            return res.status(400).json({ username: "Username already exists" })
        } else {
            const nickName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
            const newUser = new UserModel({
                username: req.body.username,
                password: req.body.password,
                group: req.body.group,
                nickName: nickName
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