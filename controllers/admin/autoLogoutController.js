const { setUpdateAll, insertUpdate, insertUpdate } = require('../../middleware/updated')
const { UpdatedModel, UserModel } = require('../../models')
const jwt = require('jsonwebtoken')

const getAllUser = async () => {
    const user = await UserModel.find({}).select(['_id'])
    return user
}

const checkUser = async (id) => {
    const update = await UpdatedModel.findOne({userId: id})
    if(update.length > 0) {
        return 1 
    } else {
        return 0
    }
}

module.exports = async function autoLogoutController(req, res) {
    if(req.headers.logoutUser === process.env.CONFIRM) {
        const users = await getAllUser()
        for(let i = 0; i < users.length; i++) {
            const check = await checkUser(users[i]._id)
            if(check === 0) {
                await insertUpdate(users[i]._id)
            }
        }
        await setUpdateAll()
        const token = req.user.id
        jwt.destroy(token)
        return res.status(200).json({updateSuccess: "Success!"})
    } else {
        return res.status(400).json({again: "try again!"})
    }
}