const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validatorLogin } = require('../../validation') 
const { UserModel } = require('../../models')
const { setUpdate } = require('../../middleware/updated')
const dotenv = require('dotenv')
dotenv.config()

module.exports = async function loginUser(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    try {
        const username = req.body.username
        const password = req.body.password
        const month = 60 * 60 * 24 * 30
        const { err, isValid } = validatorLogin(req.body)
        
        if(!isValid){
            return res.status(400)
            .json({error: "Error2!"})
        }
        
        const user = await UserModel.findOne({username: username})
        await setUpdate(user._id, false)
        if(user){
            bcrypt.compare(password, user.password)
            .then((isMatch) => {
                if(isMatch){
                    const payload = {
                        id: user._id,
                        nickName: user.nickName
                    }
                    
                    jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        {
                            expiresIn: month 
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
                    return res.status(400).json({passwordInCorrect: "Password incorrect!"})
                }
            })
            .catch(err =>{
                return res.status(400).json({error: "Error5!"})
            })
        } else {
            return res.status(400).json({error: "Error5!"})
        }
    } catch (err) {
        return res.status(400).json({error: "Error5!"})
    }
}

