const { UserModel } = require('../../models')

const getImagePath = async function(id) {
    const imagePath = await UserModel
                    .find({_id: id})
                    .select(['profilePicture'])
    return imagePath
}

module.exports = async function updateProfileService(id, data) {
    try {
        let imagePath = getImagePath(id)
    } catch (e) {
        console.log(e)
    }
    await UserModel.findOneAndUpdate({_id: id}, {profilePicture: data.path})
    return {completeMessage: "update success!"}
}