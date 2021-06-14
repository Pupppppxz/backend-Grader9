const { UserModel } = require("../../models")
const fs = require('fs')

const getImagePath = async function(id) {
    const imagePath = await UserModel
                    .findOne({_id: id})
                    .select(['profilePicture','_id','username'])
    return imagePath
}

const getExtention = async function(filename) {
    return filename.split('.').pop()
}

module.exports = async function profileUploadService(id, data){
    const imagePath = await getImagePath(id)
    const fileextention = await getExtention(data.path)
    console.log(imagePath);
    if(imagePath.profilePicture === "undefined") {
        fs.renameSync(data.path, "uploads\\" + imagePath.username + "." + fileextention)
        await UserModel.findOneAndUpdate({_id: id}, {profilePicture: "uploads\\" + imagePath.username + "." + fileextention})
        return {completeMessage: "upload success!"}
    } else {
        console.log("path : " + data.path);
        fs.unlinkSync(imagePath.profilePicture)
        fs.renameSync(data.path, "uploads\\" + imagePath.username + "." + fileextention)
        await UserModel.findOneAndUpdate({_id: id}, {profilePicture: "uploads\\" + imagePath.username + "." + fileextention})
        return {completeMessage: "update success!"}
    }
}