const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validatorLogin} = require('../../validation') 
const { UserModel } = require('../../models')
const { encrypt, decrypt } = require('../../middleware/encode')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async function loginUser(req, res) {
    try {
        console.log("gg", req.body.username);
        console.log("ggg", req.body.password);
        const g = req.body.username
        const gg = req.body.password
        const check = g.split("")
        const check2 = gg.split("")
        if(check.length === 65 && check2.length === 65) {
            return res.status(400).json({error: "Error1!"})
        }
        const username = decrypt(req.body.username)
        const password = decrypt(req.body.password)
        console.log(username);
        console.log(password);
        const { err, isValid } = validatorLogin(req.body)
        
        if(!isValid){
            return res.status(400)
            .json({error: "Error2!"})
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
                        .json({error: "Error3!"})
                }
            })
        } else {
            return res.status(400).json({error: "Error4!"})
        }
    } catch (err) {
        return res.status(400).json({error: "Error5!"})
    }
}

