const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const key = require('../../config/key')
const {validatorLogin} = require('../../validation') 
const { UserModel } = require('../../models')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async function loginUser(req, res) {
    try {
        const { err, isValid } = validatorLogin(req.body)
        const username = req.body.username
        const password = req.body.password
        
        if(!isValid){
            return res.status(400)
            .json({error: "Error!"})
        }
        
        const user = await UserModel.findOne({username})
        if(user){
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
                        .json({error: "Error!"})
                }
            })
        } else {
            return res.status(400).json({error: "Error!"})
        }
    } catch (err) {
        return res.status(400).json({error: "Error!"})
    }
}

