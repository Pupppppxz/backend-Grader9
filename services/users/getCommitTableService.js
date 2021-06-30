const {UserModel} = require('../../models')

module.exports = async function getCommitTableService(status) {
    const table = await UserModel
                .find({userStatus: status})
                .select(['score','nickname','username','finished','profilePicture','group','commit'])
                .sort({commit: 'desc'})
    return table
}