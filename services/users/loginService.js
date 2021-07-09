const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validatorLogin} = require('../../validation') 
const { UserModel } = require('../../models')
const { encrypt, decrypt } = require('../../middleware/encode')
module.exports = async function loginUser(req, res) {
    try {
        const g = req.body.username
        const gg = req.body.password
        const check = g.split("")
        const check2 = gg.split("")
        if(check.length === 32 && check2.length === 32) {
            return res.status(400).json({error: "Error!"})
        }
        const username = decrypt(req.body.username)
        const password = decrypt(req.body.password)
        const { err, isValid } = validatorLogin(req.body)
        
        if(!isValid){
            return res.status(400)
            .json({error: "Error!"})
        }
        
        const user = await UserModel.findOne({username: username})
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
                                token: encrypt("Bearer " + token),
                                status: encrypt(user.userStatus),
                                username: encrypt(user.username),
                                nickName: encrypt(user.nickName),
                                id: encrypt(user._id)
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

