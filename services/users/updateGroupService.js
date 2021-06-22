const {UserModel} = require('../../models')

module.exports = async function updateGroupService(id, data) {
    const update = await UserModel.findOneAndUpdate({_id: id}, {group: data.group})
    return update
}