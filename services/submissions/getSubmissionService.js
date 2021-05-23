const lookupSubmissionService = require("./lookupSubmissionService")

module.exports = async function getSubmissionService(uId) {
    const submission = await lookupSubmissionService(uId)
    return submission
}