const { SubmitModel } = require("../../models")

module.exports = async function insertSubmissionService(data){
    const submit = new SubmitModel(data)
    return submit.save()
}