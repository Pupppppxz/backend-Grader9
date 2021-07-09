const { SubmitCodeModel } = require('../../models')
const moment = require('moment')

module.exports = async function getFinishSubmissionCodeService(qId) {
    const code = await SubmitCodeModel.find({questionId: qId, status: 2}).select(['code','createdAt']).limit(5)
    let items = []
    for(i = 0; i < code.length; i++) {
        let time = moment(code[i].createdAt)
        let item = {
            code: code[i].code,
            status: code[i].status,
            time: time.utcOffset('+0700').format('l') + " " + time.utcOffset('+0700').format('LTS')
        }
        items.push(item)
    }
    return items
}