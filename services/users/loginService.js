const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const key = require('../../config/key')
const {validatorLogin} = require('../../validation') 
const { UserModel } = require('../../models')

module.exports = function loginUser(req, res) {
    const { err, isValid } = validatorLogin(req.body)
    const username = req.body.username
    const password = req.body.password
    
    if(!isValid){
        return res.status(400).json(err)
    }

        UserModel.findOne({username})
        .then(user => {
            if(!user){
                return res.status(400).json({usernameNotFound: "Username not found"})
            }

            //check password
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    const payload = {
                        id: user._id,
                        nickName: user.nickName
                    }
                    
                    //sign token
                    jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '1d' 
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                status: user.userStatus,
                                username: user.username,
                                nickName: user.nickName,
                                id: user._id
                            })
                        }
                    )
                } else {
                    return res
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect"})
                }
            })
    })
}

