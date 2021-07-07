const {SubmitCodeModel, SubmitModel} = require('../../models')
const moment = require('moment')

const getSubmit = async function(userId) {
    const submit = await SubmitModel.find({userId: userId})
                .sort({updatedAt: 'desc'})
    if(submit.length === 0) {
        return 0
    } else {
        return submit
    }
}

module.exports = async function getSubmissionService(userId) {
    let item = []
    const submission = await getSubmit(userId)
    console.log(submission);
    if(submission === 0) {
        return {notHaveSubmission: "Not have submission"}
    } else {
        for (const index in submission) {
            let newObject = {
                result: submission[index].score,
                status: submission[index].status,
                score: submission[index].score,
                number: submission[index].number,
                time: moment(submission[index].updatedAt).format("l") + " " + moment(submission[index].updatedAt).format("LTS")
            }
            item.push(newObject)
        }
        return item
    }
}