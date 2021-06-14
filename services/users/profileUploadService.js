const { UserModel } = require("../../models")
const fs = require('fs')

const getImagePath = async function(id) {
    const imagePath = await UserModel
                    .findOne({_id: id})
                    .select(['profilePicture','_id'])
    return imagePath.profilePicture
}

module.exports = async function profileUploadService(id, data){
    const imagePath = await getImagePath(id)
    console.log(imagePath);
    if(imagePath === "undefined") {
        await UserModel.findOneAndUpdate({_id: id}, {profilePicture: data.path})
        return {completeMessage: "upload success!"}
    } else {
        fs.unlinkSync(imagePath)
        await UserModel.findOneAndUpdate({_id: id}, {profilePicture: data.path})
        return {completeMessage: "update success!"}
    }
}