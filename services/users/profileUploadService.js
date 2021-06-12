const { UserModel } = require("../../models")

module.exports = async function profileUploadService(id, data){
    await UserModel.findOneAndUpdate({_id: id}, {profilePicture: data.path})
    return {completeMessage: "upload success"}
}