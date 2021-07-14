const { HistoryModel, QuestionModel } = require('../../models')
const moment = require('moment')

const getHistory = async (userId) => {
    const get = await HistoryModel.find({userId: userId})
                .sort({createdAt: 'desc'})
    if(get.length === 0) {
        return 0
    } else {
        return get
    }
}

const deleteHistory = async (id) => {
    const del = HistoryModel.deleteOne({_id: id})
    return del
}

const getQuestion = async (questionId) => {
    const question = await QuestionModel.findOne({_id: questionId}).select(["title","finished"])
    return question
}

module.exports = async function getHistoryService(userId) {
    try {
        const history = await getHistory(userId)
        let items = []
        if(history === 0) {
            return null
        } else {
            if(history.length > 20) {
                for(i = 20; i < history.length; i++){
                    await deleteHistory(history[i]._id)
                }
            }
            for(i = 0; i < history.length; i++) {
                const { title } = await getQuestion(history[i].questionId)
                const time = moment(history[i].updatedAt)
                let item = {
                    title: title,
                    result: history[i].result,
                    score: history[i].score,
                    status: history[i].status,
                    time: time.utcOffset('+0700').format('l') + " " + time.utcOffset('+0700').format('LTS')
                }
                items.push(item)
            }
            if(items.length > 20) {
                items.splice(0, 20)
            }
            return items
        }
    } catch (err) {
        console.log(err)
    }
}
