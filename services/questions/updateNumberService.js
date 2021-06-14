const { ActivityModel } = require("../../models")

module.exports = async function updateNumberService(id, data) {
    return ActivityModel.findOneAndUpdate({_id: id}, data)
}