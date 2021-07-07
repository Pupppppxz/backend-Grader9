const { HistoryModel, QuestionModel } = require('../../models')

const getHistory = async (userId) => {
    const get = await HistoryModel.find({userId: userId})
                .sort({createdAt: 'desc'})
    if(get.length === 0) {
        return 0
    } else {
        return get
    }
}

const getQuestion = async (questionId) => {
    const question = await QuestionModel.find({_id: questionId}).select(["title","question","number","rank","finished"])
    return question
}

module.exports = async function getHistoryService(userId) {
    const history = await getHistory(userId)
    let items = []
    if(history === 0) {
        return null
    } else {
        for(i = 0; i < history.length; i++) {
            const question = await getQuestion(history[i].questionId)
            let item = {
                title: question.title,
                question: question.question,
                number: question.number,
                rank: question.rank,
                result: history[i].result,
                score: history[i].score,
                status: history[i].status,
            }
            items.push(item)
        }
        if(history.length > 20) {
            for(i = 20; i < history.length; i++) {
                
            }
        }
    }
}