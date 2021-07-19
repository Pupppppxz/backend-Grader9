const { SubmitCodeModel, UserModel } = require('../../models')
const moment = require('moment')
const checkUser = async (id) => {
    const user = await UserModel.findOne({_id: id}).select(['group'])
    return user
}

module.exports = async function getFinishSubmissionCodeService(qId) {
    const code = await SubmitCodeModel.find({questionId: qId, status: 2}).select(['code','createdAt','userId','status'])
    let items = []
    for(i = 0; i < code.length; i++) {
        if(items.length === 5){
            break
        }
        const { group } = await checkUser(code[i].userId)
        if(group) {
            if(group < 5) {
                let time = moment(code[i].createdAt)
                let item = {
                    code: code[i].code,
                    status: code[i].status,
                    time: time.utcOffset('+0700').format('l') + " " + time.utcOffset('+0700').format('LTS'),
                }
                items.push(item)
            }
        }
    }
    return items
}