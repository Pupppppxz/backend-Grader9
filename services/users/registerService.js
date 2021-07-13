const bcrypt = require('bcryptjs')
const { validatorRegister } = require('../../validation')
const { UserModel } = require('../../models')
const sha256 = require('sha256')
const { decrypt } = require('../../middleware/encode')
const dotenv = require('dotenv')
dotenv.config()

module.exports = function registerUser(req, res) {
    const p1 = decrypt(req.query.p1)
    try {
        if(p1 == process.env.A_PASS && req.query.p2 == process.env.CONFIRM) {
            const { err, isValid } = validatorRegister(req.body)

            if (!isValid) {
                return res.status(400).json({Error: "Hello world!"});
            }

            UserModel.findOne({username: req.body.username})
            .then(user => {
                if (user) {
                    return res.status(400).json({Error: "Hello world!"});
                } else {
                    // const mySalt = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
                    const newUser = new UserModel({
                        username: req.body.username,
                        password: req.body.password,
                        group: req.body.group,
                        nickName: req.body.username
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(sha256(newUser.password), salt, (err, hash) => {
                            if(err) throw err
                            newUser.password = hash
                            newUser
                                .save()
                                .then(() => res.json({yiamGood: "Yiam good!"}))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
            .catch(err => {
                return res.status(400).json({gg: "Yiam bad"})
            })
        } else {
            return res.status(400).json({Hello: "GG!"})
        }
    } catch (err) {
        return res.status(400).json({error: "Error!"})
    }
}