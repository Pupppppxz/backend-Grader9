const { SubmitModel, UserModel } = require('../../models')

const getAllUser = async () => {
    const user = await UserModel.find({})
    const format = user.filter(user => user.group < 5)
    return format
}

const getFinished = async (userId) => {
    const submit = await SubmitModel.find({userId: userId, status: 2})
    return submit
}

const updateForUser = async (id, data) => {
    const user = await UserModel.findOneAndUpdate({_id: id}, data)
    return user
}

module.exports = async function updateAllUserDetailService() {
    const users = await getAllUser()
    for(i = 0; i < users.length; i++) {
        let total = 0
        const getFinish = await getFinished(users[i]._id)
        for(let j = 0; j < getFinish.length; j++) {
            total = total + getFinish[j].score
        }
        await updateForUser(users[i]._id, {score: total, finished: getFinish.length})
    }
    return {Success: "Success!"}
}